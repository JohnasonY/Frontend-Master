import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import About from './routes/About'
import Dashboard from './routes/Dashboard'
import PokemonDetail from './routes/PokemonDetail'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="dashboard">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
