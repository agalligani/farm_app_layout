import { useSelector } from 'react-redux'
import { selectAllAreas } from '../selectAllAreass/selectAllAreassApiSlice'
import NewNoteForm from './NewNoteForm'

const NewNote = () => {
    const selectAllAreas = useSelector(selectAllAreas)

    if (!selectAllAreas?.length) return <p>Not Currently Available</p>

    const content = <NewNoteForm selectAllAreas={selectAllAreas} />

    return content
}
export default NewNote