import { Route, Routes } from "react-router-dom"
import Home from "./Home/Home"
import Main from "./Main/Main"

const Site = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/o/*" element={<Main/>}/>
      </Routes>
    </>
  )
}

export default Site