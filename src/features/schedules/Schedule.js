import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectScheduleById } from './schedulesApiSlice'
import {Card} from 'react-bootstrap'

const Schedule = ({scheduleId}) => {
 
  const schedule = useSelector((state)=>selectScheduleById(state, scheduleId))
  const navigate = useNavigate()
  const handleClick = () => navigate(`/schedules/${scheduleId}`)

  if (!schedule) {
    return <h2>Error: no schedule retrieved. Contact Administrator</h2>
  } 

  return (
    <Card onClick={() => handleClick()} style={{cursor : 'pointer'}} >
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <Card.Body>
        <Card.Title>{schedule.areatitle} - {schedule.cropname}</Card.Title>
        <Card.Text>
            <span>Estimated days until maturity.</span>
        </Card.Text>
    </Card.Body>
    </Card>   
  )
}
export default Schedule