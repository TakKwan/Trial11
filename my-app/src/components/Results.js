import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { searchParks } from "../services"
import ParkCard from "./ParkCard"

const Results = () => {
  const { search } = useParams()
  const [searchResults, setSearchResults] = useState(null)

  const fetchResults = async () => {
    const results = await searchParks(search)
    setSearchResults(results)
  }

  useEffect(() => {
    fetchResults()
  }, [search])

  return (
    <div className="parksContainer">
      {
        searchResults?.map(park => <ParkCard park={park} key={park.parkCode} />)
      }
    </div>
  )
}

export default Results