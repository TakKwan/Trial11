import { useState, useEffect, useRef } from "react"
import { getPark } from "../services"
import { useParams } from "react-router-dom"
import { addToWatchList, addToFavorites, unwatch, removeFavorite } from "../services"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faEye } from "@fortawesome/free-solid-svg-icons"
import { faStar as offStar, faEye as offEye } from "@fortawesome/free-regular-svg-icons"
import { throttleFunction } from "../utils"

const intervals = []

const ParkDetails = ({ userId }) => {
  const imageWrapper = useRef(null)
  const { parkCode } = useParams(null)
  const [park, setPark] = useState(null)
  const [intervalId, setIntervalId] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const [favIcon, setFavIcon] = useState(offStar)
  const [watched, setWatched] = useState(false)
  const [watchIcon, setWatchIcon] = useState(offEye)

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
    if (imageWrapper.current?.scrollLeft + imageWrapper.current?.offsetWidth >= imageWrapper.current?.scrollWidth) {
      imageWrapper.current.scrollLeft = 0
    }
    imageWrapper.current.scrollLeft += 1;
  }

  const manualScrollHandler = throttleFunction(() => {
    clearInterval(intervalId)
    setTimeout(autoScroll, 10000)
  }, 100000)

  const autoScroll = () => {
    const newIntervalId = setInterval(() => window.requestAnimationFrame(scroll), 1000 / 60)
    setIntervalId(newIntervalId);
    intervals.push(newIntervalId);
    return newIntervalId
  }

  const toggleFavorite = () => {
    if (favorited) {
      setFavorited(false)
      removeFavorite(userId, park.parkCode)
      setFavIcon(offStar)
    } else {
      setFavorited(true)
      addToFavorites(userId, park.parkCode)
      setFavIcon(faStar)
    }
  }

  const toggleWatch = () => {
    if (watched) {
      setWatched(false)
      unwatch(userId, park.parkCode)
      setWatchIcon(offEye)
    } else {
      setWatched(true)
      addToWatchList(userId, park.parkCode)
      setWatchIcon(faEye)
    }
  }

  const hoverFavIcon = () => {
    setFavIcon(favIcon === faStar ? offStar : faStar)
  }

  const exitFavIcon = () => {
    setFavIcon(favorited ? faStar : offStar)
  }

  const hoverWatchIcon = () => {
    setWatchIcon(watchIcon === faEye ? offEye : faEye)
  }

  const exitWatchIcon = () => {
    setWatchIcon(watched ? faEye : offEye)
  }

  return (
    <div className="parkDetails">
      <div className="imageContainer" >
        <div className="groupButtons">
          <FontAwesomeIcon icon={favIcon} className="fa-2xl fa" onClick={toggleFavorite} onMouseEnter={hoverFavIcon} onMouseLeave={exitFavIcon} />
          <FontAwesomeIcon icon={watchIcon} className="fa-2xl fa" onClick={toggleWatch} onMouseEnter={hoverWatchIcon} onMouseLeave={exitWatchIcon} />
        </div>
        <div className="imageWrapper" ref={imageWrapper} onWheel={manualScrollHandler}>
          {park?.images.map((image, index) =>
            <img src={image.url} alt="" className="parkImage" key={index} />
          )}
        </div>
      </div>

      <div className="contentContainer">
        <h2 className="details title">{park?.fullName}</h2>
        <h3>Description</h3>
        <p className="detailsDescription">{park?.description}</p>
        <h3>Weather</h3>
        <p className="detailsDescription">{park?.weatherInfo}</p>
      </div>
    </div>
  )
}

export default ParkDetails