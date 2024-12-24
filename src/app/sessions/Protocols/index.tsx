import Card from "../components/Card"
import ProtocolSection from "./ProtocolSection"
import PROTOCOL_LIST from "./protocolList"

const Protocols = () => {
  return (
    <Card title="Step 2: Utilize assets across protocols">
      {PROTOCOL_LIST.map(({ title, description, data, tag, tagTooltip }) => (
        <ProtocolSection key={title} title={title} description={description} data={data} tag={tag} tagTooltip={tagTooltip}></ProtocolSection>
      ))}
    </Card>
  )
}

export default Protocols
