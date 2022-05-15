import { useState, useEffect, useRef } from "react"
import { getPark } from "../services"
import { useNavigate, useParams } from "react-router-dom"
import { addToWatchList, addToFavorites, unwatch, removeFavorite } from "../services"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faEye } from "@fortawesome/free-solid-svg-icons"
import { faStar as offStar, faEye as offEye } from "@fortawesome/free-regular-svg-icons"
import { throttleFunction } from "../utils"

const intervals = []

const ParkDetails = ({ user, setUser }) => {
  const imageWrapper = useRef(null)
  const { parkCode } = useParams(null)
  const [park, setPark] = useState(null)
  const [intervalId, setIntervalId] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const [favIcon, setFavIcon] = useState(offStar)
  const [watched, setWatched] = useState(false)
  const [watchIcon, setWatchIcon] = useState(offEye)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPark()
    checkFavorite()
    checkWatch()
    const intervalId = autoScroll()
    return () => clearInterval(intervalId)
  }, [user])

  const fetchPark = async () => {
    const respond = await getPark(parkCode)
    setPark(respond)
  }

  const checkFavorite = () => {
    const isFavorited = user?.favorites?.some(favorite => favorite === parkCode)
    setFavorited(isFavorited)
    setFavIcon(isFavorited ? faStar : offStar)
  }

  const checkWatch = () => {
    const isWatched = user?.watchlist?.some(watched => watched === parkCode)
    setWatched(isWatched)
    setWatchIcon(isWatched ? faEye : offEye)
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
    if (!user) {
      navigate("/login")
      return;
    }

    if (favorited) {
      const index = user.favorites.findIndex(favorite => favorite === parkCode)
      user.favorites.splice(index, 1)
      setUser(user)
      setFavorited(false)
      removeFavorite(user.id, park.parkCode)
      setFavIcon(offStar)
    } else {
      user.favorites.push(parkCode)
      setUser(user)
      setFavorited(true)
      addToFavorites(user.id, park.parkCode)
      setFavIcon(faStar)

    }
  }

  const toggleWatch = () => {
    !user && navigate('/login')
    if (watched) {
      const index = user.watchlist.findIndex(watch => watch === parkCode)
      user.watchlist.splice(index, 1)
      setUser(user)
      setWatched(false)
      unwatch(user.id, park.parkCode)
      setWatchIcon(offEye)
    } else {
      user.watchlist.push(parkCode)
      setUser(user)
      setWatched(true)
      addToWatchList(user.id, park.parkCode)
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