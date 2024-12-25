import { promises as fs } from "fs"

import Explaination from "./Explaination"
import Header from "./Header"

const ScrAndsSCRPage = async () => {
  const circulatingSupplyStr = await fs.readFile(process.cwd() + "/public/tokenomics/circulatingSupply.txt", "utf8")
  const circulatingSupply = +circulatingSupplyStr

  return (
    <>
      <Header circulatingSupply={circulatingSupply}></Header>
      <Explaination></Explaination>
    </>
  )
}

export default ScrAndsSCRPage
