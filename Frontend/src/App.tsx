import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'
import About from './components/About/about'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
