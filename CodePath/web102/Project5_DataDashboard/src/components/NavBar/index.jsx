import './NavBar.css'
import logo from '../../assets/logo.svg'

export default function NavBar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#top" aria-label="PokeDashboard home">
        <img className="brand-logo" src={logo} alt="" />
        <span><span className="brand-poke">Poke</span><span className="brand-dashboard">Dashboard</span></span>
      </a>
      <nav aria-label="Primary navigation">
        <p>Workspace</p>
        <button className="active" type="button">Dashboard</button>
        <button type="button">About</button>
      </nav>
    </aside>
  )
}
