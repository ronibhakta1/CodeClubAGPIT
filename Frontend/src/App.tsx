import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/homepage'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
