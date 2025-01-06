import { promises as fs } from "fs"

import { BNToAmount } from "@/utils"

import Explaination from "./Explaination"
import Header from "./Header"

const ScrAndsSCRPage = async () => {
  const circulatingSupplyStr = await fs.readFile(process.cwd() + "/public/tokenomics/circulatingSupply.txt", "utf8")
  const circulatingSupply = +circulatingSupplyStr

  console.log(process.env.NEXT_PUBLIC_AGORA_API_URI, "process.env.NEXT_PUBLIC_AGORA_API_URI")
  const { votable_supply } = await fetch(`${process.env.NEXT_PUBLIC_AGORA_API_URI}/api/v1/votable_supply`).then(res => res.json())

  return (
    <>
      <Header circulatingSupply={circulatingSupply} votableSupply={BNToAmount(BigInt(votable_supply))}></Header>
      <Explaination></Explaination>
    </>
  )
}

export default ScrAndsSCRPage
