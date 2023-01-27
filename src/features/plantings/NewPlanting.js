import { useSelector } from 'react-redux'
import { selectAllAreas } from '../areas/areasApiSlice'
import { selectAllCrops } from '../crops/cropsApiSlice'
import NewPlantingForm from './NewPlantingForm'
import MainBody from '../../layouts/MainDoubleColumn'

const NewPlanting = () => {

    const areas = useSelector(selectAllAreas)
    const crops = useSelector(selectAllCrops)

    if (!areas?.length) return <p>Areas not Currently Available</p>
    if (!crops?.length) return <p>Crops not Currently Available</p>

    console.log(crops)

    const content = <MainBody>
        <NewPlantingForm areas={areas} crops={crops} />
        </MainBody>

    return content
}
export default NewPlanting