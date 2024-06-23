import styles from "./Admin.module.scss";

// import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import TopBand from "./LeftBoard/TopBand";
import BottomBand from "./LeftBoard/BottomBand";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DashboardRenter from "./MainBoard/Renter/Dashboard/DashboardRenter";
import { MessageContextProvider } from "@utils/Context/MessageContext";
import NotFound from "./Errors/404";
import Unauthorized from "./Errors/403";
import { useEffect, useState } from "react";
import { verifyRole } from "@utils/utils";

// admin
import UserList from "./MainBoard/Admin/Users/UserList";
import User from "./MainBoard/Admin/Users/User";
import LocationList from "./MainBoard/Admin/Locations/LocationList";
import ReservationPage from "./MainBoard/Admin/Users/Reservation/ReservationPage";
import LocationAdmin from "./MainBoard/Admin/Locations/LocationPage";

// renter
import Messages from "./MainBoard/Renter/Messages/Messages";
import Locations from "./MainBoard/Renter/Locations/Locations";
import Settings from "./MainBoard/Renter/Settings/Settings";
import LocationRenter from "./MainBoard/Renter/Locations/Location/Location";

// const theme = extendTheme({ cssVarPrefix: "demo" });

const Admin = () => {
  const [checkRoleState, setCheckRoleState] = useState<boolean>(false)
  const navigate = useNavigate();
  const checkRole = async () => {
    setCheckRoleState(false)
    const role = await verifyRole();
    if (role !== "admin" && role !== "renter"){
      console.log("Not admin or renter, redirect")
      return navigate("/");
    }
    setCheckRoleState(true);
  };

  useEffect(() => {
    checkRole();
  });

  const location = useLocation();
  return (
    //   <CssVarsProvider
    //     defaultMode="dark"
    //     theme={theme}
    //     colorSchemeSelector="#demo_dark-mode-by-default"
    //     modeStorageKey="demo_dark-mode-by-default"
    //     disableNestedContext
    //   >
    
    checkRoleState ?
      <div className={styles.container}>
        <div className={styles.left_band}>
          <div className={styles.top_left_band}>
            <TopBand location={location} />
          </div>
          <div className={styles.bottom_left_band}>
            <BottomBand />
          </div>
        </div>

        <div className={styles.main_board}>
          <MessageContextProvider>
            <Routes>
              <Route path="/" element={<DashboardRenter />} />


              {/* renter */}
              <Route path="/renter/locations" element={<Locations />} />
              <Route path="/renter/location/:id" element={<LocationRenter />} />
              <Route path="/renter/messages" element={<Messages />} />
              <Route path="/renter/settings" element={<Settings />} />

              {/* admin */}
              <Route path="/users/list" element={<UserList />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/locations" element={<LocationList />} />
              <Route path="/locations/list" element={<LocationList />} />
              <Route path="/location/:id" element={<LocationAdmin />} />
              <Route
                path="/location/:location_id/reservation/:reservation_id"
                element={<ReservationPage />}
              />


              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="/404" element={<NotFound />} />
              <Route path="/403" element={<Unauthorized />} />
            </Routes>
          </MessageContextProvider>
        </div>
      </div>
    :
      <></>
    
    // </CssVarsProvider>
  );
};

export default Admin;
