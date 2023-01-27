//Note - is a schedule form?
import MainBody from "../../layouts/MainSingleColumn"
import { useGetPlantingsQuery } from "./plantingsApiSlice"
import { useNavigate } from "react-router-dom";
import Planting from './Planting'
import GridLoader from "react-spinners/GridLoader";
import { Button } from "react-bootstrap"

const PlantingsList = () => {

    const navigate = useNavigate()
    const handleNewClick = () => {navigate('/plantings/new')}


  const { data: plantings,
        isLoading,
        isSuccess,
        isError,
        error  
  } = useGetPlantingsQuery({

  })
  
  let content

  if (isLoading) content = <><p>Loading...</p><p><GridLoader color="#36d7b7" /></p></>

  if (isError) {
      content = <><p>Error</p><p>{error?.data?.message}</p></>
      console.log(error.data)
  }

  if (isSuccess) {
      const { ids } = plantings

      const plantingRows = ids?.length
      ? ids.map(plantingId => 
          <Planting key={plantingId} plantingId={plantingId} />
        )
      : null

      content = plantingRows
      }
  
  return (
      <MainBody title='Plantings'>
        <>
          <Button onClick={handleNewClick}>New Planting</Button>
          {content}
        </>
      </MainBody>
    )
  }

export default PlantingsList