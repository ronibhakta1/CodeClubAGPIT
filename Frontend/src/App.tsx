import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import Members from './components/members/members'
import Userpage from './components/user_page/Userpage'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/members" element={<Members />} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/events" element={<h1>Events</h1>} />
      <Route path="/userpage" element={<Userpage />} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
