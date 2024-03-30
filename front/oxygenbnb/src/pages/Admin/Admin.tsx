import styles from "./Admin.module.scss"
import { useTranslation } from "react-i18next";

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import TopBand from "./LeftBoard/TopBand";
import BottomBand from "./LeftBoard/BottomBand";
import { Route, Routes, useLocation } from "react-router-dom";
import HomeAdmin from "./HomeAdmin";
import Messages from "./MainBoard/Renter/Messages/Messages";
import DashboardRenter from "./MainBoard/Renter/DashboardRenter";
import Locations from "./MainBoard/Renter/Locations";
import Settings from "./MainBoard/Renter/Settings";

const theme = extendTheme({ cssVarPrefix: 'demo' });

const Admin = () => {
  // const { t } = useTranslation(['site_default']);
  const location = useLocation();
  return (
    <CssVarsProvider
      defaultMode="dark"
      theme={theme}
      colorSchemeSelector="#demo_dark-mode-by-default"
      modeStorageKey="demo_dark-mode-by-default"
      disableNestedContext
    >

      <div className={styles.container}>
        <div className={styles.left_band}>
          <div className={styles.top_left_band}>
            <TopBand location={location}/>
          </div>
          <div className={styles.bottom_left_band}>
            <BottomBand/>
          </div>
        </div>

        <div className={styles.main_board}>
          <Routes>
            <Route path="/" element={<HomeAdmin/>}/>
            <Route path="/renter/dashboard" element={<DashboardRenter/>}/>
            <Route path="/renter/locations" element={<Locations/>}/>
            <Route path="/renter/messages" element={<Messages/>}/>
            <Route path="/renter/settings" element={<Settings/>}/>
            
            <Route path="/*" element={<HomeAdmin/>}/>
          </Routes>
        </div>
        
      </div>
    </CssVarsProvider>
  )
}

export default Admin