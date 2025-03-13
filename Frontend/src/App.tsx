import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import Members from './components/members/members'
import About from './components/About/about'
import Events from './components/Events/Event'
import Userpage from './components/user_page/Userpage'


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
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
