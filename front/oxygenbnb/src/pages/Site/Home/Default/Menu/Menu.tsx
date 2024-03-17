import styles from "./Menu.module.scss";
import logo from "../../../../../assets/Logo OxygenBNB.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { Drawer } from "@mui/material";
import Menu_extended from "./Extended/Menu_extended";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import Dialog from '@mui/material/Dialog';
import AuthForm from "./AuthForm";

const Menu = () => {
  const [showMenuExtended, setShowMenuExtended] = useState<boolean>(false);
  const [openDialogAccount, setOpenDialogAccount] = useState<boolean>(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setShowMenuExtended(newOpen);
  };
  return (
    <>
      <menu className={styles.container}>
        <div className={styles.menu_display_off_container}>

          <div className={styles.burger_container} onClick={toggleDrawer(true)}>
            <MenuRoundedIcon sx={{color:"#1E1E1E"}} fontSize="large"/>
          </div>

          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo of OxygenBNB" />
            </Link>
          </div>

          <div className={styles.account_logo}>
            <AccountBoxRoundedIcon onClick={() => setOpenDialogAccount(true)} sx={{color:"#1E1E1E"}} fontSize="large"/>
          </div>

        </div>
      </menu>
      <Drawer open={showMenuExtended} onClose={toggleDrawer(false)}>
        <Menu_extended/>
      </Drawer>
      <Dialog sx={{ maxHeight:"unset" }} onClose={() => setOpenDialogAccount(false)} open={openDialogAccount}>
        <AuthForm/>
      </Dialog>

      {/* <Menu_extended show={showMenuExtended} setShow={setShowMenuExtended}/> */}
    </>

  )
}

export default Menu