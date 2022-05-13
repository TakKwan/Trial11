import { useState, useEffect, useRef } from "react"
import { getPark } from "../services"
import { useParams } from "react-router-dom"
import { addToWatchList, addToFavorites, unwatch, removeFavorite } from "../services"

const ParkDetails = ({ userId }) => {
  const [park, setPark] = useState()
  const { parkCode } = useParams()
  const imageContainer = useRef()
  const [intervalId, setIntervalId] = useState()
  const [favorited, setFavorited] = useState()

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
        {userId && <button onClick={() => addToFavorites(userId, park.parkCode)}>Favorite</button>}
        {userId && <button onClick={() => removeFavorite(userId, park.parkCode)}>Remove Favorite</button>}
        {userId && <button onClick={() => addToWatchList(userId, park.parkCode)}>Watch</button>}
        {userId && <button onClick={() => unwatch(userId, parkCode)}>unwatch</button>}
        <h3>Description</h3>
        <p className="detailsDescription">{park?.description}</p>
        <h3>Weather</h3>
        <p className="detailsDescription">{park?.weatherInfo}</p>
      </div>
    </div>
  )
}

export default ParkDetails