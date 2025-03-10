import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import Events from './components/EventPage/Events'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Events" element={<Events />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
