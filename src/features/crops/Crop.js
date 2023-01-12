import { useSelector } from "react-redux"
import { selectCropById } from './cropsApiSlice'
import { useNavigate } from 'react-router-dom'
import { Row, Card, Button } from 'react-bootstrap'

const Crop = ({cropId}) => {
  const crop = useSelector((state) => selectCropById(state, cropId))
  const navigate = useNavigate()
  const handleClick = () => navigate(`/crops/${cropId}`)

  return (
      <Row>
        <Card onClick={() => handleClick()} style={{cursor : 'pointer'}} >
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
            <Card.Title>{crop.name} - {crop.qualifier}</Card.Title>
            <Card.Text>
                <span>Estimated {crop.daysUntilMature} days until maturity.</span>
            </Card.Text>
        </Card.Body>
        </Card>
      </Row>
  )
}
export default Crop