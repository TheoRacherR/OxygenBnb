import { Route, Routes } from "react-router-dom"
import Footer from "../Default/Footer/Footer"
import Menu from "../Default/Menu/Menu"
import AboutUs from "./AboutUs/AboutUs"
import styles from "./Main.module.scss"
import Search from "./Search/Search"
import Room from "./Room/Room"
import Auth from "../../Auth/Auth"

const Main = () => {
  return (
    <div>
      <Menu/>
        <div className={styles.main}>
          <Routes>
            <Route path="/search" element={<Search/>}/>
            <Route path="/room/:id" element={<Room/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/login" element={<Auth/>}/>

          </Routes>
        </div>
      <Footer/>
    </div>
  )
}

export default Main