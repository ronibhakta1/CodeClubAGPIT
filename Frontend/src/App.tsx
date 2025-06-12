import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import About from './components/About/about'
import Members from './components/members/members'
import Events from './components/Events/Event'
import Userpage from './components/user_page/Userpage'
import Admin from './components/Admin/Admin'
import Hackathon from './components/Events/Hackathon'
import HackathonCountdownPage from './pages/hackathon-countdown'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/members" element={<Members />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/users" element={<Userpage />} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/events/hackathon" element={<Hackathon />} />
      <Route path="/events/hackathon-countdown" element={<HackathonCountdownPage />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
