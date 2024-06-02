import { Route, Routes } from "react-router-dom"
import Home from "./Home/Home"
import Main from "./Main/Main"
import { SearchContextProvider } from "../../utils/Context/SearchContext"
import { useEffect } from "react"

const Site = () => {
  useEffect(() => {
    localStorage.getItem('discussionSelected') === null || localStorage.getItem('discussionSelected') === '{}' ? '' : localStorage.setItem('discussionSelected', '{}')
  })
  return (
    <>
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/o/*" element={<Main/>}/>
        </Routes>
      </SearchContextProvider>
    </>
  )
}

export default Site