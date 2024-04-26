import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Site from './pages/Site/Site'
import Dashboard from './pages/Admin/Admin'


const App = () => {

  return (
    <>
      <Router>
        <Routes>

          <Route path='/*' element={<Site/>}/>
          <Route path='/admin/*' element={<Dashboard/>}/>

        </Routes>

      </Router>
    </>
  )
}

export default App

