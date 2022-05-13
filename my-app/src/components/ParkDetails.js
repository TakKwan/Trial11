import { useState, useEffect, useRef } from "react"
import { getPark } from "../services"
import { useParams } from "react-router-dom"
import { addToWatchList } from "../services"

const ParkDetails = () => {
  const [park, setPark] = useState()
  const { parkCode } = useParams()
  const imageContainer = useRef()

  const fetchPark = async () => {
    const respond = await getPark(parkCode)
    setPark(respond)
  }

  const scroll = () => {
    imageContainer.current.scrollLeft += 1.5;
  };

  useEffect(() => {
    fetchPark()
    setInterval(() => window.requestAnimationFrame(scroll), 1000 / 60)
  }, [])

  return (
    <div className="parkDetails">
      <div className="imageContainer" ref={imageContainer}>
        {park?.images.map((image, index) =>
          <img src={image.url} alt="" className="parkImage" key={index} />
        )}
      </div>
      <div className="contentContainer">
        <h2 className="details title">{park?.fullName}</h2>
        <p className="detailsDescription">{park?.description}</p>
        <button onClick={() => scroll(1)}>click me</button>
      </div>
    </div>
  )
}

export default ParkDetails