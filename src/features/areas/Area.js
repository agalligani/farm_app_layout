import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAreaById } from './areasApiSlice'

const Area = ({ areaId }) => {

    const area = useSelector(state => selectAreaById(state, areaId))
    const navigate = useNavigate()

    if (area) {
        const handleEdit = () => navigate(`/areas/${areaId}`)

        return (

                <article>
                    {area.title}
                    <button
                        className="icon-button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </article>
        )
    } else {
        return <article><h2>No areas defined.</h2></article>
    }
}

export default Area