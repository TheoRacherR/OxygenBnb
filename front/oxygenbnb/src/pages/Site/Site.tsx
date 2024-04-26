import { Route, Routes } from "react-router-dom"
import Home from "./Home/Home"
import Main from "./Main/Main"
import { SearchContextProvider } from "../../utils/Context/SearchContext"

const Site = () => {
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