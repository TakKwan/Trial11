import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div className="navbar">
      <NavLink to="/" className="nav_element" id='homeButton'>Home</NavLink>
      {props.user ?
        [<NavLink to="/watchlist" key="watchlist" className="nav_element">Watchlist</NavLink>,
        <NavLink to="/favorites" key="favorites" className="nav_element">Favorites</NavLink>,
        <div onClick={props.logout} key="logout" className="nav_element">Log Out</div>]
        :
        [<NavLink to="/register" key="register" className="nav_element">Register</NavLink>,
        <NavLink to="/login" key="login" className="nav_element">Login</NavLink>]
      }
    </div>
  )
}

export default Navbar