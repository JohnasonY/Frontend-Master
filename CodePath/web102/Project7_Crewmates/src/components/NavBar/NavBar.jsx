import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        Fresh Squad
      </NavLink>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
      </nav>
    </header>
  )
}

export default NavBar
