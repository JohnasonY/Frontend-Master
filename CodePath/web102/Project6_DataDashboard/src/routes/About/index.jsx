import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <section className="about-page">
      <div className="about-header">
        <p>About this project</p>
        <h1>PokeDashboard</h1>
      </div>

      <div className="about-grid">
        <article className="about-panel">
          <h2>Project purpose</h2>
          <p>
            This website lets users explore a Pokemon dataset through searchable dashboard rows,
            filters, direct detail pages, and charts that summarize patterns in the fetched data.
          </p>
        </article>

        <article className="about-panel">
          <h2>API used</h2>
          <p>
            The app uses the public PokeAPI to fetch Pokemon names, artwork, types, height,
            weight, abilities, moves, and base stats.
          </p>
          <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">Visit PokeAPI</a>
        </article>

        <article className="about-panel">
          <h2>Built with</h2>
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Recharts</li>
            <li>Vite</li>
          </ul>
        </article>
      </div>

      <Link className="about-back-link" to="/">Back to dashboard</Link>
    </section>
  )
}
