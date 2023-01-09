import PlantingsMainBody from "./PlantingsMainBody"

const content = <div>Planting</div>
const sidebar = <div>SideBar</div>

const Planting = () => {
  return (
    <PlantingsMainBody MainContent={content} sidebar={sidebar} />
  )
}
export default Planting