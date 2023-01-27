import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPlantingById } from './plantingsApiSlice'
import { Form } from 'react-bootstrap'

const Planting = ({ plantingId }) => {

    console.log("id" + plantingId)

    const planting = useSelector((state) => selectPlantingById(state, plantingId))


    console.log(planting)
    const navigate = useNavigate()

    if (planting) {
        const handleEdit = () => navigate(`/plantings/${plantingId}`)

        return (
                <article>
                    <Form onSubmit={e => e.preventDefault()}>
                    {planting.title}
                    <button
                        className="icon-button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    </Form>
                </article>
        )
    } else {
        const handleEdit = () => navigate(`/plantings/${plantingId}`)

        return ( 
        <article>
            <Form>
                <h2>{plantingId}</h2>
                <button onClick={handleEdit}>Hi</button>
            </Form>
        </article>
        )
    }
}

export default Planting