import { Route, Routes, useLocation } from "react-router-dom"
import Footer from "../Default/Footer/Footer"
import MenuSearch from "../Default/MenuSearch/MenuSearch"
import Menu from "../Default/MenuSearch/Menu"
import AboutUs from "./AboutUs/AboutUs"
import styles from "./Main.module.scss"
import Room from "./Room/Room"
import Auth from "../../Auth/Auth"
import Profil from "./Profil/Profil"
import AddLocation from "./Renter/AddLocation"
import ReservationPage from "./Room/Reserve/ReservationPage"

const Main = () => {
  const location = useLocation();
  return (
    <div>
      {
      location.pathname === "/o/search" ?
        <MenuSearch />
      :
        <Menu />
      }
      <div className={styles.main}>
        <Routes>
          {/* room */}
          <Route path="/room/:id" element={<Room/>}/>
          <Route path="/room/:id/reservation" element={<ReservationPage/>}/>

          <Route path="/about-us" element={<AboutUs/>}/>

          {/* auth */}
          <Route path="/login" element={<Auth/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/login/*" element={<Auth/>}/>
          <Route path="/auth/*" element={<Auth/>}/>

          {/* user */}
          <Route path="/user/*" element={<Profil/>}/>

          {/* renter */}
          <Route path="/renter/add-location" element={<AddLocation/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default Main