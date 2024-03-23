import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import styles from "./RightMenu.module.scss";
import { useState } from 'react';
import Fade from '@mui/material/Fade';

import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const RightMenu = () => {
  const { t, i18n } = useTranslation(['site_default']);
  const [anchorEl, setAnchorEl] = useState({lang: null, settings: null});
  const handleClickSettings = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({lang: null, settings: event.currentTarget});
  };
  const handleClickLang = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl({lang: event.currentTarget, settings: null});
  };
  const handleClose = () => {
    setAnchorEl({lang: null, settings: null});
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
    localStorage.setItem('lng', language)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left_button}>
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={Boolean(anchorEl.lang) ? 'long-menu' : undefined}
            aria-expanded={Boolean(anchorEl.lang) ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClickLang}
          >
            <LanguageRoundedIcon sx={{color:"white"}}/>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl.lang}
            open={Boolean(anchorEl.lang)}
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
      </div>
      {/* Select */}
      
      <div className={styles.right_button}>
        <div className={styles.right_container} onClick={handleClickSettings}>
          <MenuRoundedIcon/>
          <AccountCircleRoundedIcon/>
        </div>
        <Menu
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl.settings}
          open={Boolean(anchorEl.settings)}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Link to="profil"  style={{color: "black", textDecoration: "none"}}>
            <MenuItem onClick={handleClose}><PersonOutlineRoundedIcon sx={{marginRight: "15px"}}/>
                {t("site_default:default.menu.right_menu.right_menu_tsx.profil")}
            </MenuItem>
          </Link>
          <Link to="settings" style={{color: "black", textDecoration: "none"}}>
            <MenuItem onClick={handleClose}><SettingsRoundedIcon sx={{marginRight: "15px"}}/>
              {t("site_default:default.menu.right_menu.right_menu_tsx.settings")}
            </MenuItem>
          </Link>
          <Divider sx={{ my: 0.5 }} />
          <Link to="login"  style={{color: "black", textDecoration: "none"}}>
            <MenuItem onClick={handleClose}><LoginRoundedIcon sx={{marginRight: "15px"}} color='success'/>
              {t("site_default:default.menu.right_menu.right_menu_tsx.login")}
            </MenuItem>
          </Link>
          <Link to="logout"  style={{color: "black", textDecoration: "none"}}>
            <MenuItem onClick={handleClose}><LogoutRoundedIcon sx={{marginRight: "15px"}} color='error'/>
              {t("site_default:default.menu.right_menu.right_menu_tsx.logout")}
            </MenuItem>
          </Link>
        </Menu>
      </div>
    </div>
  )
}

export default RightMenu