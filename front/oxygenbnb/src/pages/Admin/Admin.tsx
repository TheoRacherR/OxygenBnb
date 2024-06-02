import styles from "./Admin.module.scss";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import TopBand from "./LeftBoard/TopBand";
import BottomBand from "./LeftBoard/BottomBand";
import { Route, Routes, useLocation } from "react-router-dom";
import Messages from "./MainBoard/Renter/Messages/Messages";
import DashboardRenter from "./MainBoard/Renter/Dashboard/DashboardRenter";
import Locations from "./MainBoard/Renter/Locations/Locations";
import Settings from "./MainBoard/Renter/Settings/Settings";
import LocationRenter from "./MainBoard/Renter/Locations/Location/Location";
import { MessageContextProvider } from "../../utils/Context/MessageContext";
import UserList from "./MainBoard/Admin/Users/UserList";
import LocationList from "./MainBoard/Admin/Locations/LocationList";
import User from "./MainBoard/Admin/Users/User";
import ReservationPage from "./MainBoard/Admin/Users/Reservation/ReservationPage";
import LocationAdmin from "./MainBoard/Admin/Locations/LocationPage"

const theme = extendTheme({ cssVarPrefix: "demo" });

const Admin = () => {
  // const { t } = useTranslation(['site_default']);
  const location = useLocation();
  return (
    //   <CssVarsProvider
    //     defaultMode="dark"
    //     theme={theme}
    //     colorSchemeSelector="#demo_dark-mode-by-default"
    //     modeStorageKey="demo_dark-mode-by-default"
    //     disableNestedContext
    //   >
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
            {/* Renter */}
            <Route path="/" element={<DashboardRenter />} />
            <Route path="/renter" element={<DashboardRenter />} />
            <Route path="/renter/locations" element={<Locations />} />
            <Route path="/renter/location/:id" element={<LocationRenter />} />
            <Route path="/renter/messages" element={<Messages />} />
            <Route path="/renter/settings" element={<Settings />} />
            <Route path="/renter/*" element={<DashboardRenter />} />

            {/* Admin */}
            <Route path="/users/list" element={<UserList />} />
            <Route path="/user/:id" element={<User />} />

            <Route path="/locations/list" element={<LocationList />} />
            <Route path="/location/:id" element={<LocationAdmin />} />
            <Route path="/location/:location_id/reservation/:reservation_id" element={<ReservationPage />} />
          </Routes>
        </MessageContextProvider>
      </div>
    </div>
    // </CssVarsProvider>
  );
};

export default Admin;
