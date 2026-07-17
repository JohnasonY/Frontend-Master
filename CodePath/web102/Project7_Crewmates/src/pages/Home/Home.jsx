import { Link } from 'react-router-dom'
import homeImage from '../../assets/home.webp'
import './Home.css'

function Home() {
  return (
    <section className="page narrow-page home-page">
      <img
        alt="Splatoon characters posing with colorful weapons"
        className="home-image"
        src={homeImage}
      />
      <p className="eyebrow">Splatoon character creator</p>
      <h1>Build a fresh squad.</h1>
      <p className="lede">
        Create Inkling and Octoling crewmates, choose their team color and weapon,
        then manage your roster from the gallery.
      </p>
      <div className="hero-actions">
        <Link className="primary-button" to="/create">
          Create a Crewmate
        </Link>
        <Link className="secondary-button" to="/gallery">
          View Gallery
        </Link>
      </div>
    </section>
  )
}

export default Home
