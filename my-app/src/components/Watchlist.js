import { getMultiParks } from "../services"
import { useState, useEffect } from "react"
import ParkCard from './ParkCard'

const Watchlist = ({ user }) => {
  const [parks, setParks] = useState(null)

  const fetchWatchList = async () => {
    const watchlist = user.Watches.map(park => park.parkCode)
    const res = await getMultiParks(watchlist)
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