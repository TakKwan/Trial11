import { useState, useEffect } from "react"
import { getPark } from "../services"
import { useParams } from "react-router-dom"
import { addToWatchList } from "../services"

const ParkDetails = () => {
  const [park, setPark] = useState()
  const { parkCode } = useParams()

  const fetchPark = async () => {
    const respond = await getPark(parkCode)
    setPark(respond)
  }

  useEffect(() => {
    fetchPark()
  }, [])

  return (
    <div className="parkDetails">
      <div className="imagesContainer">
        {park?.images.map((image, index) =>
          <img src={image.url} alt="" className="parkImage" key={index} />
        )}
      </div>
      <div className="contentContainer">
        <h2 className="details title">{park?.fullName}</h2>
        <p className="detailsDescription">{park?.description}</p>
      </div>
    </div>
  )
}

export default ParkDetails