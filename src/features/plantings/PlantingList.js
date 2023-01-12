//Note - is a schedule form?
import MainBody from "../../layouts/MainSingleColumn"
import { useGetPlantingsQuery } from "./plantingsApiSlice"
import Planting from './Planting'
import GridLoader from "react-spinners/GridLoader";

const PlantingList = () => {

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
      <MainBody title='Plantings'>{content}</MainBody>
    )
  }

export default PlantingList