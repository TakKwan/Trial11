import { getWatchlist, getMultiParks } from "../services"
import { useState, useEffect } from "react"
import ParkCard from './ParkCard'

const Watchlist = ({ userId }) => {
  const [watchlist, setWatchlist] = useState(null)
  const [parks, setParks] = useState(null)

  const fetchWatchList = async () => {
    const respond = await getWatchlist(userId).then(watchlist => watchlist.map(park => park.parkCode))
    setWatchlist(respond)
    const res = await getMultiParks(respond)
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