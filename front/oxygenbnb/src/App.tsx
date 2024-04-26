import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Site from './pages/Site/Site'
import { SearchContextProvider } from './utils/Context/SearchContext'


const App = () => {

  return (
    <>
      <SearchContextProvider>
        <Router>
          <Routes>

            <Route path='/*' element={<Site/>}/>

          </Routes>

        </Router>
      </SearchContextProvider>
    </>
  )
}

export default App

