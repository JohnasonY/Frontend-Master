import { NavLink } from 'react-router-dom'
import './NavBar.css'
import logo from '../../assets/logo.svg'

export default function NavBar() {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/" aria-label="PokeDashboard home">
        <img className="brand-logo" src={logo} alt="" />
        <span><span className="brand-poke">Poke</span><span className="brand-dashboard">Dashboard</span></span>
      </NavLink>
      <nav aria-label="Primary navigation">
        <p>Workspace</p>
        <NavLink to="/" end>
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7v-9h-7v9Zm0-16v5h7V4h-7Z" />
            </svg>
          </span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/about">
          <span className="nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M11 10h2v7h-2v-7Zm0-3h2v2h-2V7Z" />
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 16.4A7.4 7.4 0 1 1 12 4.6a7.4 7.4 0 0 1 0 14.8Z" />
            </svg>
          </span>
          <span>About</span>
        </NavLink>
      </nav>
    </aside>
  )
}
