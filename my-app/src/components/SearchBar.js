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
    setSearch(!search)
    if (search && searchValue) {
      navigate(`/results/${searchValue}`)
      setSearchValue('')
      setSearch(false)
    }
  }

  const addOnSearchClassName = (className) => {
    return [className, search && "onSearch"].filter(s => s).join(" ")
  }

  return (
    <div className="searchContainer">
      <div className={addOnSearchClassName("searchWrapper")}>
        <form onSubmit={searchHandler}>
          <input key="searchInput" type="text" className={["searchInput", search ? "shown" : "hidden"].filter(s => s).join(" ")} value={searchValue} placeholder="Search Parks" onChange={onSearchChange} />
        </form>
        <div className={addOnSearchClassName("iconWrapper")} onClick={searchHandler}>
          <FontAwesomeIcon icon={searchIcon} className="fa-2xl searchIcon fa-2xl" />
        </div>
      </div>
    </div>
  )
}

export default SearchBar