import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import Members from './components/members/members'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/members" element={<Members />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
