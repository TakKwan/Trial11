import { getFavorites, getMultiParks } from "../services"
import { useState, useEffect } from "react"
import ParkCard from './ParkCard'

const Favorites = ({ userId }) => {
  const [parks, setParks] = useState(null)

  const fetchFavorites = async () => {
    const respond = await getFavorites(userId).then(favorites => favorites.map(park => park.parkCode))
    const res = await getMultiParks(respond)
    setParks(res)
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <div className="favorites list">
      {parks && parks[0] &&
        parks.map(park => (
          <ParkCard park={park} key={park.parkCode} />
        ))
      }
    </div>
  )
}

export default Favorites