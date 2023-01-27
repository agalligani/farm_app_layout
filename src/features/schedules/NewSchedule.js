//Simply serves the NewScheduleForm
import NewScheduleForm from './NewScheduleForm'
import MainBody from '../../layouts/MainDoubleColumn'
import { selectAllAreas } from '../areas/areasApiSlice'
import { useSelector } from 'react-redux'

const NewSchedule = () => {
    const areas = useSelector(selectAllAreas)

    return (
        <MainBody>
            <NewScheduleForm areas={areas}/>
        </MainBody>
    )
}
export default NewSchedule