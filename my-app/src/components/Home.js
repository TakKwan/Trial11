import { useEffect, useState } from "react"
import { getParks } from "../services"
import ParkCard from "./ParkCard"
import TablePagination from '@mui/material/TablePagination'

const Home = () => {
  const [parks, setParks] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(12)

  const fetchParks = async () => {
    const respond = await getParks(rowsPerPage * page, rowsPerPage)
    setParks(respond)
  }

  useEffect(() => {
    fetchParks()
    window.scrollTo(0, 0)
  }, [page, rowsPerPage])

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
    setPage(0)
  }

  return (
    <div className="home">
      <div className="parksContainer">
        {
          parks && parks.data.map(park => (
            <ParkCard park={park} key={park.parkCode} />
          ))
        }
      </div>
      {parks &&
        <TablePagination
          component="div"
          count={parseInt(parks.total)}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="pagebar"
          rowsPerPageOptions={[12, 24, 48, 96]}
        />}
    </div>

  )
}

export default Home