import React from "react";
import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import { useTranslation } from "react-i18next";
import UserInfo from "./UserBlocks/UserInfo";
import LocationList from "./UserBlocks/LocationList";
import ReservationList from "./UserBlocks/ReservationList";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

const User = () => {
  const { id } = useParams();
  // const { t } = useTranslation(['admin_admin']);

  return (
    <div className={styles.container}>
      <div className={styles.inside_container}>
        <UserInfo id={id}/>
        <LocationList id={id}/>
        <ReservationList id={id}/>
      </div>
    </div>
  );
};

export default User;
