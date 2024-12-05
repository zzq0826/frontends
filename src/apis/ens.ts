const ensBaseURL = process.env.NEXT_PUBLIC_ENS_API_URL

export function getEnsAddressURL(ens: string) {
  return `${ensBaseURL}/name/${ens}/address`
}
