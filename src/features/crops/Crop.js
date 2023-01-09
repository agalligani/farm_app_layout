import CropsMainBody from "./CropsMainBody"

const Crop = () => {

  const content = <div>Crops</div>
  const sidebar = <div>SideBar</div>
  return (
    <CropsMainBody MainContent={content} SideBar={sidebar} />
  )
}
export default Crop