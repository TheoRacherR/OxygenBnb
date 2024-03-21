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
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const RightMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.right_container} onClick={handleClick}>
        <MenuRoundedIcon/>
        <AccountCircleRoundedIcon/>
      </div>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Link to="profil"  style={{color: "black", textDecoration: "none"}}>
          <MenuItem onClick={handleClose}><PersonOutlineRoundedIcon sx={{marginRight: "15px"}}/>
              Profile
          </MenuItem>
        </Link>
        <Link to="settings" style={{color: "black", textDecoration: "none"}}>
          <MenuItem onClick={handleClose}><SettingsRoundedIcon sx={{marginRight: "15px"}}/>Settings</MenuItem>
        </Link>
        <Divider sx={{ my: 0.5 }} />
        <Link to="login"  style={{color: "black", textDecoration: "none"}}>
          <MenuItem onClick={handleClose}><LoginRoundedIcon sx={{marginRight: "15px"}} color='success'/>Login</MenuItem>
        </Link>
        <Link to="logout"  style={{color: "black", textDecoration: "none"}}>
          <MenuItem onClick={handleClose}><LogoutRoundedIcon sx={{marginRight: "15px"}} color='error'/>Logout</MenuItem>
        </Link>
      </Menu>
  </div>
  )
}

export default RightMenu