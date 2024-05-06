import styles from "./Styles.module.scss";
import Avatar from "@mui/joy/Avatar";
import InputComponent from "../../InputComponent";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Button } from "@mui/joy";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const userData = {
  id: 2,
  frist_name: "Théo",
  last_name: "RACHER RAULIN",
  email: "theo@gmail.com",
  role: "User",
  created_at: "10-08-2022",
  upated_at: "13-05-2024",
};

const UserInfo = () => {
  const { t } = useTranslation(["site_main"])
  useEffect(() => {
    window.scroll(0, 0) 
  },[])

  return (
    <Accordion defaultExpanded sx={{ backgroundColor: "#f0f0f0" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: "f0f0f0",
          color: "black",
          border: "1px solid #32383e",
          borderRadius: "10px",
        }}
      >
        <PersonRoundedIcon />
        &nbsp;{t("site_main:main.profil.users.user_blocks.user_info_tsx.summary")}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "f0f0f0",
          color: "black",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Avatar />
            <InputComponent
              label={t("site_main:main.profil.users.user_blocks.user_info_tsx.list.firstname")}
              value={userData.frist_name}
              disabled={false}
            />
            <InputComponent
              label={t("site_main:main.profil.users.user_blocks.user_info_tsx.list.lastname")}
              value={userData.last_name}
              disabled={false}
            />
          </div>

          <div className={styles.item}>
            <InputComponent label={t("site_main:main.profil.users.user_blocks.user_info_tsx.list.id")} value={userData.id} disabled={true} />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("site_main:main.profil.users.user_blocks.user_info_tsx.list.email")}
              value={userData.email}
              disabled={false}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("site_main:main.profil.users.user_blocks.user_info_tsx.list.role")}
              value={userData.role}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("site_main:main.profil.users.user_blocks.user_info_tsx.list.created_at")}
              value={userData.created_at}
              disabled={true}
            />
            <InputComponent
              label={t("site_main:main.profil.users.user_blocks.user_info_tsx.list.updated_at")}
              value={userData.upated_at}
              disabled={true}
            />
          </div>
          <div
            className={styles.item}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Button sx={{ borderRadius: "6px" }} color="success">
            {t("site_main:main.profil.users.user_blocks.user_info_tsx.list.save")}
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserInfo;
