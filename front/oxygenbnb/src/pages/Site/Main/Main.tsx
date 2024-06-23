import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Default/Footer/Footer";
import MenuSearch from "../Default/MenuSearch/MenuSearch";
import Menu from "../Default/MenuSearch/Menu";
import AboutUs from "./AboutUs/AboutUs";
import styles from "./Main.module.scss";
import Room from "./Room/Room";
// import Auth from "../../Auth/Auth"
import Profil from "./Profil/Profil";
import AddLocation from "./Renter/AddLocation";
import ReservationPage from "./Room/Reserve/ReservationPage";
import { useEffect } from "react";
import Search from "./Search/Search";
import { verifyIfLogged } from "@utils/utils";
import NotFound from "../Errors/404/NotFound";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkIfLogged = async () => {
    const logged = await verifyIfLogged();
    if (!logged) {
      console.log("Not logged, redirect");
      return navigate("/auth");
    }
  };

  useEffect(() => {
    checkIfLogged();
  });

  return (
    <div>
      {location.pathname === "/o/search" ? <MenuSearch /> : <Menu />}
      <div className={styles.main}>
        <Routes>
          <Route path="/search" element={<Search />} />
          {/* room */}
          <Route path="/room/:id" element={<Room />} />
          <Route path="/room/:id/reservation" element={<ReservationPage />} />

          <Route path="/about-us" element={<AboutUs />} />

          <Route path="/user/*" element={<Profil />} />

          {/* renter */}
          <Route path="/renter/add-location" element={<AddLocation />} />

          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
