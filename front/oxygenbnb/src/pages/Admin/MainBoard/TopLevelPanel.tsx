import React from "react";
import styles from "./TopLevelPanel.module.scss";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { pink } from '@mui/material/colors';

const TopLevelPanel = ({ title, pathValues, currentPageTitle }) => {
  return (
    <div className={styles.container}>
      <Breadcrumbs separator={<KeyboardArrowRight />} aria-label="breadcrumbs">
        <Link to="/admin">
          <HomeRoundedIcon sx={{ margin: "auto 0", color: "white" }}/>
        </Link>
        {pathValues.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{ textDecoration: "none", color: "white" }}
          >
            {item.name}
          </Link>
        ))}
        <Typography>{currentPageTitle}</Typography>
      </Breadcrumbs>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default TopLevelPanel;
