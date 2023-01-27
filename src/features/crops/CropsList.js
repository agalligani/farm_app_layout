import { useGetCropsQuery } from "./cropsApiSlice"
import Crop from "./Crop"
import MainBody from '../../layouts/MainDoubleColumn';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap'

const CropsList = () => {

    const navigate = useNavigate()
    const handleNewClick = () => {navigate('/crops/new')}

    const {
        data: crops,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCropsQuery(undefined, {
        pollingInterval: 95000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = crops

        const cropRows = ids?.length
        ? ids.map(cropId => <Crop key={cropId} cropId={cropId} />)
        : null
    

        content = (
            <MainBody title="Crops">
                <>
                <Button onClick={handleNewClick}>New Crop</Button>
                {cropRows}
                </>
            </MainBody>
        )

    return content
  }
}
export default CropsList