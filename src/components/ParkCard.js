import { useNavigate } from "react-router-dom"
import { useState } from "react"

const ParkCard = ({ park }) => {
  const navigate = useNavigate()
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${park.images[0].url})` }}
      onClick={() => navigate(`/parkdetails/${park.parkCode}`)}>
      <div className="cardContent">
        <h3 className="parkTitle">{park.fullName}</h3>
        <p className="description">{park.description}</p>
      </div>
    </div >
  )
}

export default ParkCard