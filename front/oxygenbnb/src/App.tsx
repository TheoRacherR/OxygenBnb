import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { SearchContextProvider } from './utils/Context/SearchContext'

import Site from './pages/Site/Site'
import Dashboard from './pages/Admin/Admin'


const App = () => {

  return (
    <>
      <SearchContextProvider>
        <Router>
          <Routes>

            <Route path='/*' element={<Site/>}/>
            <Route path='/admin/*' element={<Dashboard/>}/>

          </Routes>

        </Router>
      </SearchContextProvider>
    </>
  )
}

export default App

