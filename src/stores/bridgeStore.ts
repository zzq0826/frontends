import { create } from "zustand"

import { tokenListUrl } from "@/apis/dynamic"
import { EXTERNAL_BRIDGE_TOKEN_LIST, NATIVE_TOKEN_LIST, NETWORKS } from "@/constants"
import { USER_TOKEN_LIST } from "@/constants/storageKey"
import { loadState } from "@/utils/localStorage"
import { scrollRequest } from "@/utils/request"

type TransactionType = "Deposit" | "Withdraw"

type WithdrawStep = "1" | "2"

interface TxSuccess {
  code: 1
}
export interface TxError {
  code: 0
  message: string
}

type TxResult = TxSuccess | TxError | null
interface BridgeStore {
  historyVisible: boolean
  changeHistoryVisible: (value) => void

  // new-bridge
  fromNetwork: Network
  toNetwork: Network
  txType: TransactionType
  withdrawStep: WithdrawStep
  txResult: TxResult
  isNetworkCorrect: boolean
  tokenList: Array<Token>

  changeFromNetwork: (network: Network) => void
  changeToNetwork: (network: Network) => void
  changeTxType: (txType: TransactionType) => void
  changeTxResult: (txResult: TxResult | null) => void
  changeWithdrawStep: (withdrawStep: WithdrawStep) => void
  changeIsNetworkCorrect: (isNetworkCorrect: boolean) => void
  fetchTokenList: () => Promise<void>
}

const useBridgeStore = create<BridgeStore>()((set, get) => ({
  historyVisible: false,
  fromNetwork: NETWORKS[0],
  toNetwork: NETWORKS[1],
  txType: "Deposit",
  withdrawStep: "1",
  txResult: null,
  isNetworkCorrect: true,
  tokenList: NATIVE_TOKEN_LIST,

  fetchTokenList: async () => {
    try {
      const { tokens: tokensListTokens } = await scrollRequest(tokenListUrl)
      const currentUserTokens = loadState(USER_TOKEN_LIST) || []

      const combinedList = [...NATIVE_TOKEN_LIST, ...tokensListTokens, ...currentUserTokens, ...EXTERNAL_BRIDGE_TOKEN_LIST]
      const uniqueList = combinedList.reduce(
        (accumulator, token) => {
          // If the token doesn't have an address, consider it a native token and add it directly
          if (!token.address) {
            accumulator.result.push(token)
            return accumulator
          }
          // Convert address to lowercase for case-insensitive deduplication
          const lowercaseAddress = token.address.toLowerCase()
          // Create a key combining address and chainId to ensure different chainIds are not deduplicated
          const key = `${lowercaseAddress}-${token.chainId}`

          if (!accumulator.seen[key]) {
            accumulator.seen[key] = true
            accumulator.result.push(token)
          }
          return accumulator
        },
        { seen: {}, result: [] },
      ).result
      set({
        tokenList: uniqueList,
      })
    } catch (e) {
      set({
        tokenList: NATIVE_TOKEN_LIST,
      })
      throw new Error(e.message)
    }
  },

  changeHistoryVisible: value => {
    set({
      historyVisible: value,
    })
  },
  changeFromNetwork: network => {
    set({
      fromNetwork: network,
    })
  },
  changeToNetwork: network => {
    set({
      toNetwork: network,
    })
  },
  changeTxType: txType => {
    set({
      txType,
    })
  },

  changeTxResult: txResult => {
    set({
      txResult,
    })
  },

  changeWithdrawStep: withdrawStep => {
    set({
      withdrawStep,
    })
  },

  changeIsNetworkCorrect: isNetworkCorrect => {
    set({
      isNetworkCorrect,
    })
  },
}))

export default useBridgeStore
