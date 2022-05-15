import { getMultiParks } from "../services"
import { useState, useEffect } from "react"
import ParkCard from './ParkCard'

const Favorites = ({ user }) => {
  const [parks, setParks] = useState(null)

  const fetchFavorites = async () => {
    const res = await getMultiParks(user.favorites)
    setParks(res)
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <div className="favorites list">
      {parks && parks[0].parkCode &&
        parks.map(park => (
          <ParkCard park={park} key={park.parkCode} />
        ))
      }
    </div>
  )
}

export default Favorites