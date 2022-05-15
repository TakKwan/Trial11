import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass as searchIcon } from "@fortawesome/free-solid-svg-icons"

const SearchBar = () => {
  const [search, setSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const onSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  const searchHandler = () => {
    if (!search) {
      setSearch(true)
    } else {
      navigate(`/results/${searchValue}`)
      setSearchValue('')
      setSearch(false)
    }
  }

  return (
    <div className="searchContainer">
      <div className={["searchWrapper", search && "onSearch"].filter(s => s).join(" ")}>
        <form onSubmit={searchHandler}>
          <input key="searchInput" type="text" className={["searchInput", search ? "shown" : "hidden"].filter(s => s).join(" ")} value={searchValue} placeholder="Search Parks" onChange={onSearchChange} />
        </form>
        <FontAwesomeIcon icon={searchIcon} className="fa-2xl searchIcon fa-2xl" onClick={searchHandler} />
      </div>
    </div>
  )
}

export default SearchBar