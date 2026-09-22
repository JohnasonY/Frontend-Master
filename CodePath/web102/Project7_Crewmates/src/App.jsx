import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import CreateCrewmate from './pages/CreateCrewmate/CreateCrewmate'
import CrewGallery from './pages/CrewGallery/CrewGallery'
import CrewmateDetail from './pages/CrewmateDetail/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate/EditCrewmate'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<CrewGallery />} />
          <Route path="/crewmate/:id" element={<CrewmateDetail />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
