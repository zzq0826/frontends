import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import WarningSvg from "@/assets/svgs/bridge/warning.svg"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETH_SYMBOL, NATIVE_TOKEN_LIST } from "@/constants"
import { BRIDGE_TOKEN } from "@/constants/searchParamsKey"
import { usePriceFeeContext } from "@/contexts/PriceFeeProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo, useBalance } from "@/hooks"
import useApprove from "@/hooks/useApprove"
import useCheckViewport from "@/hooks/useCheckViewport"
// import useBalance from "@/hooks/useViemBalance"
import useGasFee from "@/hooks/useGasFee"
import { useSendTransaction } from "@/hooks/useSendTransaction"
import useSufficientBalance from "@/hooks/useSufficientBalance"
import useBatchBridgeStore, { BridgeSummaryType, DepositBatchMode } from "@/stores/batchBridgeStore"
import useBridgeStore from "@/stores/bridgeStore"
import { amountToBN, checkApproved, switchNetwork, trimErrorMessage } from "@/utils"

import ApprovalDialog from "./ApprovalDialog"
import BalanceInput from "./BalanceInput"
import CustomiseRecipient from "./CustomiseRecipient"
import ExternalBridge from "./ExternalBridge"
import TransactionSummary from "./TransactionSummary"
import useBatchDeposit from "./hooks/useBatchDeposit"

const SendTransaction = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams: any = useSearchParams()
  const token = searchParams.get(BRIDGE_TOKEN)
  const tokenSymbol = useMemo(() => token || ETH_SYMBOL, [token])

  const { chainId, connect, walletCurrentAddress } = useRainbowContext()
  const { isMobile } = useCheckViewport()

  const { gasLimit, gasPrice, errorMessage: relayFeeErrorMessage, fetchData: fetchPriceFee, getL1DataFee } = usePriceFeeContext()

  const { txType, isNetworkCorrect, fromNetwork, changeTxResult, tokenList } = useBridgeStore()
  const { bridgeSummaryType, depositBatchMode, batchDepositConfig } = useBatchBridgeStore()

  const [amount, setAmount] = useState<string>("")

  const [maxWarning, setMaxWarning] = useState<string>()

  const [bridgeWarning, setBridgeWarning] = useState()
  const [inputError, setInputError] = useState(false)

  const [approvalVisible, setApprovalVisible] = useState(false)
  const [recipient, setRecipient] = useState(null)

  const validAmount = useMemo(() => (Number(amount) > 0 ? amount : ""), [amount])

  const tokenOptions = useMemo(() => {
    return fromNetwork.chainId ? tokenList.filter(item => item.chainId === fromNetwork.chainId) : []
  }, [tokenList, fromNetwork])

  const selectedToken: any = useMemo(
    () =>
      tokenOptions.find(item => item.symbol.toLowerCase() === tokenSymbol.toLowerCase()) ??
      NATIVE_TOKEN_LIST.find(item => item.chainId === fromNetwork.chainId),
    [tokenOptions, tokenSymbol, fromNetwork],
  )
  // const { balance, isLoading: balanceLoading } = useBalance(selectedToken.address)
  const { balance, loading: balanceLoading } = useBalance(selectedToken, fromNetwork)

  const externalBridge = useMemo(() => {
    return selectedToken.extensions?.bridgeInfo
  }, [selectedToken])

  const {
    isNeeded: needApproval,
    approve,
    isRequested: isRequestedApproval,
    isLoading: approveLoading,
  } = useApprove(fromNetwork, selectedToken, validAmount)

  const {
    send: sendTransaction,
    isLoading: sendLoading,
    error: sendError,
  } = useSendTransaction({
    amount: validAmount,
    selectedToken,
    receiver: recipient,
    needApproval,
  })

  const { depositAmountIsValid } = useBatchDeposit({ selectedToken, amount: validAmount })

  // fee start
  const {
    gasFee: estimatedGasCost,
    batchDepositGasFee: estimatedBatchDepositGasCost,
    gasLimit: txGasLimit,
    error: gasFeeErrorMessage,
    calculateGasFee,
  } = useGasFee(selectedToken, needApproval)

  const l1DataFee = useAsyncMemo(
    async () =>
      txType === "Withdraw" && amount && txGasLimit
        ? await getL1DataFee(selectedToken, amountToBN(amount, selectedToken.decimals), txGasLimit)
        : BigInt(0),
    [amount, selectedToken, txGasLimit, txType],
  )
  const relayFee = useMemo(() => gasLimit * gasPrice, [gasLimit, gasPrice])

  const l1GasFee = useMemo(() => {
    if (depositBatchMode === DepositBatchMode.Economy && bridgeSummaryType === BridgeSummaryType.Selector) {
      return estimatedBatchDepositGasCost
    }
    return estimatedGasCost
  }, [depositBatchMode, bridgeSummaryType, estimatedBatchDepositGasCost, estimatedGasCost])

  const l2GasFee = useMemo(() => {
    if (depositBatchMode === DepositBatchMode.Economy && bridgeSummaryType === BridgeSummaryType.Selector) {
      return batchDepositConfig.feeAmountPerTx
    }
    return relayFee
  }, [depositBatchMode, bridgeSummaryType, batchDepositConfig, relayFee])

  const totalFee = useMemo(
    () => (l1GasFee && !relayFeeErrorMessage ? l1GasFee + l2GasFee + (l1DataFee ?? BigInt(0)) : null),
    [l1GasFee, relayFeeErrorMessage, l2GasFee, l1DataFee],
  )

  const { insufficientWarning } = useSufficientBalance(
    selectedToken,
    amount ? amountToBN(amount, selectedToken.decimals) : undefined,
    totalFee,
    balance ?? undefined,
  )

  useEffect(() => {
    let nextBridgeWarning
    let nextInputError = false
    if (maxWarning && maxWarning !== "FeeError") {
      nextBridgeWarning = <>{maxWarning}</>
      nextInputError = true
    } else if (gasFeeErrorMessage && (validAmount || maxWarning) && needApproval === false) {
      nextBridgeWarning = (
        <>
          {gasFeeErrorMessage},{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={() => calculateGasFee()}>
            Click here to retry.
          </TextButton>
        </>
      )
    } else if (relayFeeErrorMessage && (validAmount || maxWarning) && needApproval === false) {
      nextBridgeWarning = (
        <>
          {relayFeeErrorMessage},{" "}
          <TextButton underline="always" sx={{ fontSize: "1.4rem" }} onClick={() => fetchPriceFee()}>
            Click here to retry.
          </TextButton>
        </>
      )
    } else if (insufficientWarning) {
      nextBridgeWarning = insufficientWarning
      nextInputError = insufficientWarning !== ">0"
    }
    setBridgeWarning(nextBridgeWarning)
    setInputError(nextInputError)
  }, [chainId, fromNetwork, maxWarning, insufficientWarning, relayFeeErrorMessage, validAmount, gasFeeErrorMessage, needApproval])

  // fee end

  const necessaryCondition = useMemo(() => {
    return validAmount && !bridgeWarning && (depositAmountIsValid || (!depositAmountIsValid && depositBatchMode === DepositBatchMode.Fast))
  }, [validAmount, bridgeWarning, depositAmountIsValid, depositBatchMode])

  const sendText = useMemo(() => {
    if (txType === "Deposit" && sendLoading) {
      return "Depositing to Scroll"
    } else if (txType === "Deposit" && !sendLoading) {
      return "Deposit to Scroll"
    } else if (txType === "Withdraw" && sendLoading) {
      return "Withdrawing to Ethereum"
    }
    return "Withdraw to Ethereum"
  }, [txType, sendLoading])

  useEffect(() => {
    // TODO: refactor
    // sendError: undefined  tx success
    // sendError: !(cancel||reject)  tx failure
    if (!sendLoading && sendError !== "cancel" && sendError !== "reject") {
      setAmount("")
    }
  }, [sendLoading, sendError])

  useEffect(() => {
    if (sendError && sendError !== "cancel" && sendError !== "reject") {
      changeTxResult({ code: 0, message: trimErrorMessage(sendError.message) })
    }
  }, [sendError])

  useEffect(() => {
    setMaxWarning("")
  }, [balance, amount, totalFee])

  useEffect(() => {
    if (isRequestedApproval) {
      setApprovalVisible(false)
    }
  }, [isRequestedApproval])

  const handleChangeTokenSymbol = symbol => {
    router.push(`${pathname}?${BRIDGE_TOKEN}=${symbol}`)
  }

  const handleChangeAmount = value => {
    setAmount(value)
  }

  const handleOpenApprovalDialog = () => {
    setApprovalVisible(true)
  }

  const handleCloseApprovalDialog = () => {
    setApprovalVisible(false)
  }

  const handleError = value => {
    setMaxWarning(value)
  }

  const handleApprove = isMaximum => {
    approve(isMaximum)
  }

  const handleChangeRecipient = recipient => {
    setRecipient(recipient)
  }

  const renderButton = () => {
    if (!walletCurrentAddress) {
      return (
        <Button key="connect" width={isMobile ? "100%" : "25rem"} color="primary" onClick={connect} whiteButton>
          Connect Wallet
        </Button>
      )
    }

    if (!isNetworkCorrect) {
      return (
        <Button key="switch" width={isMobile ? "100%" : "32rem"} color="primary" onClick={() => switchNetwork(fromNetwork.chainId)} whiteButton>
          Switch to {fromNetwork.name}
        </Button>
      )
    }

    if (
      needApproval === true ||
      (!checkApproved(needApproval, DepositBatchMode.Economy) && depositBatchMode === DepositBatchMode.Economy) ||
      (!checkApproved(needApproval, DepositBatchMode.Fast) && depositBatchMode === DepositBatchMode.Fast)
    ) {
      return (
        <Button
          key="approve"
          width={isMobile ? "100%" : "25rem"}
          color="primary"
          disabled={!necessaryCondition}
          loading={approveLoading}
          onClick={handleOpenApprovalDialog}
          whiteButton
        >
          {approveLoading ? "Approving " : "Approve "}
          {tokenSymbol}
        </Button>
      )
    }

    return (
      <Button
        key="send"
        width={isMobile ? "100%" : "25rem"}
        color="primary"
        disabled={!necessaryCondition || needApproval === undefined}
        loading={sendLoading}
        onClick={sendTransaction}
        whiteButton
      >
        {sendText}
      </Button>
    )
  }

  return (
    <Stack direction="column" alignItems="center" gap={externalBridge ? "0" : txType === "Withdraw" || isMobile ? "1.6rem" : "2.4rem"}>
      <Box sx={{ width: "100%" }}>
        <BalanceInput
          value={amount}
          onChange={handleChangeAmount}
          error={inputError}
          token={selectedToken}
          fee={totalFee}
          balance={balance}
          balanceLoading={balanceLoading}
          disabled={fromNetwork.chainId !== chainId}
          readOnly={approveLoading || sendLoading}
          tokenOptions={tokenOptions}
          onError={handleError}
          onChangeToken={handleChangeTokenSymbol}
        ></BalanceInput>
        <Box sx={{ height: ["auto", "2.4rem"], width: "100%", marginBottom: ["1.6rem", "0"] }}>
          {!!bridgeWarning && bridgeWarning !== ">0" && (
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: 500,
                width: "100%",
              }}
              color="primary"
            >
              <SvgIcon
                sx={{ fontSize: "1.6rem", mr: "0.8rem", verticalAlign: "middle", color: "#FF684B" }}
                component={WarningSvg}
                inheritViewBox
              ></SvgIcon>
              <Stack
                component="span"
                direction="row"
                style={{
                  display: "inline-flex",
                  verticalAlign: "middle",
                  alignItems: "center",
                  gap: "0.2rem",
                  color: "#FF684B",
                  fontFamily: "var(--developer-page-font-family) !important",
                }}
              >
                {bridgeWarning}
              </Stack>
            </Typography>
          )}
        </Box>
        {!externalBridge && (
          <CustomiseRecipient
            readOnly={approveLoading || sendLoading}
            disabled={fromNetwork.chainId !== chainId}
            bridgeWarning={bridgeWarning}
            handleChangeRecipient={handleChangeRecipient}
          />
        )}
      </Box>

      {externalBridge ? (
        <ExternalBridge selectedToken={selectedToken} txType={txType} />
      ) : (
        <>
          {bridgeSummaryType === BridgeSummaryType.Summary && (
            <TransactionSummary
              selectedToken={selectedToken}
              amount={validAmount}
              feeError={relayFeeErrorMessage || gasFeeErrorMessage}
              // totalFee={displayedEstimatedGasCost}
              l2GasFee={relayFee}
              l1GasFee={estimatedGasCost}
              l1DataFee={l1DataFee}
              needApproval={!!needApproval}
            />
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              justifyContent: "center",
              "& .MuiButtonBase-root": { fontFamily: "var(--default-font-family) !important" },
            }}
          >
            {renderButton()}
          </Box>
          <ApprovalDialog
            open={approvalVisible}
            token={selectedToken}
            loading={approveLoading && !isRequestedApproval}
            onApprove={handleApprove}
            onClose={handleCloseApprovalDialog}
          ></ApprovalDialog>
        </>
      )}
    </Stack>
  )
}

export default SendTransaction
