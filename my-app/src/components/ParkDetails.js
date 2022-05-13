import { useState, useEffect, useRef } from "react"
import { getPark } from "../services"
import { useParams } from "react-router-dom"
import { addToWatchList, addToFavorites, unwatch, removeFavorite } from "../services"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faEye } from "@fortawesome/free-solid-svg-icons"
import { faStar as offStar, faEye as offEye } from "@fortawesome/free-regular-svg-icons"

const ParkDetails = ({ userId }) => {
  const [park, setPark] = useState(null)
  const { parkCode } = useParams(null)
  const imageContainer = useRef(null)
  const [intervalId, setIntervalId] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const [watched, setWatched] = useState(false)

  useEffect(() => {
    fetchPark()

    const intervalId = autoScroll()
    return () => clearInterval(intervalId)
  }, [])

  const fetchPark = async () => {
    const respond = await getPark(parkCode)
    setPark(respond)
  }

  const scroll = () => {

    if (imageContainer.current?.scrollLeft + imageContainer.current?.offsetWidth >= imageContainer.current?.scrollWidth) {
      imageContainer.current.scrollLeft = 0
    }
    imageContainer.current.scrollLeft += 1;
  };

  const manualScrollHandler = () => {
    clearInterval(intervalId)
  }

  const autoScroll = () => {
    const newIntervalId = setInterval(() => window.requestAnimationFrame(scroll), 1000 / 60)
    setIntervalId(newIntervalId);
    return newIntervalId
  }


  return (
    <div className="parkDetails">
      <div className="imageContainer" ref={imageContainer} onWheel={manualScrollHandler}>
        {park?.images.map((image, index) =>
          <img src={image.url} alt="" className="parkImage" key={index} />
        )}
      </div>
      <div className="contentContainer">
        <h2 className="details title">{park?.fullName}</h2>
        {favorited ? <FontAwesomeIcon icon={faStar} className="fa-2xl fa-star" onClick={() => { setFavorited(false); removeFavorite(userId, park.parkCode) }} /> :
          <FontAwesomeIcon icon={offStar} className="fa-2xl fa-star" onClick={() => { setFavorited(true); addToFavorites(userId, park.parkCode) }} />}
        {watched ? <FontAwesomeIcon icon={faEye} className="fa-2xl fa-eye" onClick={() => { setWatched(false); unwatch(userId, park.parkCode) }} /> :
          <FontAwesomeIcon icon={offEye} className="fa-2xl fa-eye" onClick={() => { setWatched(true); addToWatchList(userId, park.parkCode) }} />}
        <h3>Description</h3>
        <p className="detailsDescription">{park?.description}</p>
        <h3>Weather</h3>
        <p className="detailsDescription">{park?.weatherInfo}</p>
      </div>
    </div>
  )
}

export default ParkDetails