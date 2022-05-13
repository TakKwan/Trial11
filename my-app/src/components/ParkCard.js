import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const ParkCard = ({ park }) => {
  const navigate = useNavigate()
  const [isHovering, setIsHovering] = useState(false)
  const showDescription = () => setIsHovering(true)
  const hideDescription = () => setIsHovering(false)
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${park.images[0].url})` }}
      onClick={() => navigate(`/parkdetails/${park.parkCode}`)}>
      <div className="cardContent"
        onMouseEnter={showDescription}
        onMouseLeave={hideDescription}>
        <h3 className="parkTitle">{park.fullName}</h3>
        <p className="description">{park.description}</p>
      </div>
    </div >
  )
}

export default ParkCard