export interface ProtocolData {
  title: string
  description: string
  tag: string
  tagTooltip?: string
  data: Protocol[]
}

export interface Protocol {
  name: string
  key: string
  logoURL: string
  href: string
}

const DECENTRALIZED_EXCHANGES_DATA: ProtocolData = {
  title: "Decentralized Exchanges",
  description:
    "Marks are given to users who deposit eligible assets into selected DEXs’ liquidity pools. Liquidity deposits with tighter ranges or more market depth are given Marks at a higher rate.",
  tag: "1x ~ 6x Marks",
  tagTooltip: "Multiply Marks and maintain voting power",
  data: [
    {
      name: "AAVE",
      key: "Aave",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Aave.svg",
      href: "https://app.aave.com/",
    },
    {
      name: "Ambient",
      key: "Ambient",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Ambient%20Finance.png",
      href: "https://ambient.finance/",
    },
    {
      name: "Maverick",
      key: "Maverick",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Maverick%20Protocol.jpg",
      href: "https://www.mav.xyz/",
    },
    {
      name: "Nuri",
      key: "Nuri",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Nuri%20Exchange.jpeg",
      href: "https://www.nuri.exchange/",
    },
    {
      name: "Oku Trade",
      key: "Oku Trade",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Oku%20Trade.jpeg",
      href: "https://oku.trade/",
    },
    {
      name: "Izumi",
      key: "Izumi",
      logoURL: "https://scroll-eco-list.netlify.app/logos/iZUMi%20Finance.png",
      href: "https://izumi.finance/trade/swap",
    },
    {
      name: "Scribe",
      key: "Scribe",
      logoURL: "/imgs/sessions/tokens/Scribe.png",
      href: "https://scribe.exchange/",
    },
    {
      name: "SyncSwap",
      key: "SyncSwap",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Syncswap.png",
      href: "https://syncswap.xyz/",
    },
    {
      name: "Vessel",
      key: "Vessel",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Vessel.jpg",
      href: "https://vessel.finance/",
    },
    {
      name: "Wombat",
      key: "Wombat",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Wombat%20Exchange.png",
      href: "https://www.wombat.exchange/",
    },
    {
      name: "Zebra",
      key: "Zebra",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Zebra.png",
      href: "https://app.zebra.xyz/#/swap",
    },
  ],
}

const LENDING_BORROWING_DATA: ProtocolData = {
  title: "Lending & Borrowing",
  description:
    "Marks are given to users who deposit eligible assets into selected lending markets. Marks are not given for recursive supplying/borrowing.",
  tag: "1x Marks",
  data: [
    {
      name: "Compound",
      key: "Compound",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Compound%20Finance.png",
      href: "https://app.compound.finance/?market=usdc-scroll",
    },
    {
      name: "Huma",
      key: "Huma",
      logoURL: "/imgs/sessions/tokens/Huma.svg",
      href: "https://app.huma.finance/evm/#/",
    },
    {
      name: "Layer Bank",
      key: "Layerbank",
      logoURL: "https://scroll-eco-list.netlify.app/logos/LayerBank.png",
      href: "https://app.layerbank.finance/scroll/bank",
    },
    {
      name: "Rho Markets",
      key: "Rho Markets",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Rho%20Markets.png",
      href: "https://www.rhomarkets.xyz/",
    },
  ],
}

const PERP_DEX_DATA: ProtocolData = {
  title: "Perp Dex",
  description:
    "Marks are given to users who deposit eligible assets into selected DEXs’ liquidity pools. Liquidity deposits with tighter ranges or more market depth are given Marks at a higher rate.",
  tag: "1x Marks",
  data: [
    // not in ecosystem list
    {
      name: "Orderly Network",
      key: "Orderly Network",
      logoURL: "",
      href: "",
    },
    // logo is not right
    {
      name: "Satori",
      key: "Satori",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Satori%20Finance.png",
      href: "https://satori.finance/",
    },
  ],
}

const OTHERS_DATA: ProtocolData = {
  title: "Others",
  description:
    "Marks are given to users who deposit eligible assets into selected DEXs’ liquidity pools. Liquidity deposits with tighter ranges or more market depth are given Marks at a higher rate.",
  tag: "1x Marks",
  data: [
    {
      name: "Beefy",
      key: "Beefy",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Beefy.png",
      href: "https://app.beefy.com/",
    },
    // Not in ecosystem list
    {
      name: "Loopfi",
      key: "Loopfi",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Loop.jpg",
      href: "https://app.loopfi.xyz/",
    },
    {
      name: "Mitosis",
      key: "Mitosis",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Mitosis.jpg",
      href: "https://mitosis.org/",
    },
    // logo is not right
    {
      name: "Pencils",
      key: "Pencils",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Pencils%20Protocol.png",
      href: "https://app.pencilsprotocol.io/farming",
    },
    // not in ecosystem list
    {
      name: "Tempest",
      key: "Tempest",
      logoURL: "",
      href: "https://app.tempestfinance.xyz/vaults",
    },
    // logo is not right
    {
      name: "Tranchess",
      key: "Tranchess",
      logoURL: "https://scroll-eco-list.netlify.app/logos/Tranchess.png",
      href: "https://www.tranchess.com/",
    },
  ],
}

const protocolList = [DECENTRALIZED_EXCHANGES_DATA, LENDING_BORROWING_DATA, PERP_DEX_DATA, OTHERS_DATA]

export default protocolList
