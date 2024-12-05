const baseUrl = process.env.NEXT_PUBLIC_OPEN_BLOCK_URI
const venusUrl = process.env.NEXT_PUBLIC_SCROLL_VENUS_URI

export const fetchPastWalletPointsUrl = address => `${baseUrl}/scroll/wallet-points?walletAddress=${address}`
export const fetchCurrentWalletPointsUrl = address => `${baseUrl}/scroll/wallet-points-s2?walletAddress=${address}`

export const fetchTokensMarksUrl = address => `${baseUrl}/scroll/bridge-balances?walletAddress=${address}`
export const fetchProjectsMarksUrl = address => `${baseUrl}/scroll/project-marks?walletAddress=${address}`

export const checkSignStatus = address => `${venusUrl}/v1/signature/address?address=${address}`
export const updateSignStatus = `${venusUrl}/v1/signature/sign`
