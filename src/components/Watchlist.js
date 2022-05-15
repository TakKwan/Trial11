import { getMultiParks } from "../services"
import { useState, useEffect } from "react"
import ParkCard from './ParkCard'

const Watchlist = ({ user }) => {
  const [parks, setParks] = useState(null)

  const fetchWatchList = async () => {
    const res = await getMultiParks(user.watchlist)
    setParks(res)
  }

  useEffect(() => {
    fetchWatchList()
  }, [])

  return (
    <div className="watchlist list">
      {parks && parks[0] &&
        parks.map(park => (
          <ParkCard park={park} key={park.parkCode} />
        ))
      }
    </div>
  )
}

export default Watchlist