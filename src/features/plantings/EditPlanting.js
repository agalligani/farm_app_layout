import EditPlantingForm from "./EditPlantingForm"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPlantingById } from "./plantingsApiSlice"
import MainBody from "../../layouts/MainDoubleColumn"

const EditPlanting = () => {

  const { id } = useParams()
  const planting = useSelector( (state) => selectPlantingById(state, id))
  const content = planting ? 
      <EditPlantingForm planting={planting} /> : <><h3>"Error: Planting could not be retrieved</h3><p>Contact Administrator</p></>
  
  return (
    <>
      <MainBody>
        {content}
      </MainBody>
    </>
  )
}
export default EditPlanting