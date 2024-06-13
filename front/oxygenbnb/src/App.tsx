import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Site from './pages/Site/Site'
import Admin from './pages/Admin/Admin'

// axios.defaults.baseURL = process.env.NODE_ENV_DEV ? process.env.REACT_APP_URL_DEV : process.env.REACT_APP_URL_PROD;
// axios.defaults.withCredentials = true;

const App = () => {

  return (
    <>
      <Router>
        <Routes>

          <Route path='/*' element={<Site/>}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='*' element={<Site/>}/>

        </Routes>

      </Router>
    </>
  )
}

export default App

