import styles from "./Menu.module.scss";
import logo from "../../../../../assets/Logo OxygenBNB.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { Drawer, IconButton, Menu, MenuItem } from "@mui/material";
import Menu_extended from "./Extended/Menu_extended";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import Dialog from '@mui/material/Dialog';
import AuthForm from "./AuthForm";
import { useTranslation } from "react-i18next";
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';


const MenuComponent = () => {
  const { t, i18n } = useTranslation(['site_home']);
  const [showMenuExtended, setShowMenuExtended] = useState<boolean>(false);
  const [openDialogAccount, setOpenDialogAccount] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleDrawer = (newOpen: boolean) => () => {
    setShowMenuExtended(newOpen);
  };

  const handleClickLang = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const lang = [
    {name: "🇬🇧 English", param: "en"},
    {name: "🇫🇷 Français", param: "fr"},
  ];
  const onClickLanguageChange = (e : React.MouseEvent<HTMLElement>, value: string) => {
    handleClose();
    const language = value;
    console.log(language)
    i18n.changeLanguage(language); //change the language
  }

  return (
    <>
      <menu className={styles.container}>
        <div className={styles.menu_display_off_container}>

          <div className={styles.burger_container} onClick={toggleDrawer(true)}>
            <MenuRoundedIcon sx={{color:"#1E1E1E"}} fontSize="large"/>
          </div>

          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt={t("site_home:home.default.menu_tsx.container.menu_display_off_container.logo.alt_img")} />
            </Link>
          </div>

          <div className={styles.account_logo}>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={Boolean(anchorEl) ? 'long-menu' : undefined}
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClickLang}
              >
                <LanguageRoundedIcon sx={{color: "black"}}/>
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {lang.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.param}
                    onClick={event => onClickLanguageChange(event, item.param)}
                    // onClick={(event) => handleMenuItemClick(event, item.param)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
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

export default MenuComponent