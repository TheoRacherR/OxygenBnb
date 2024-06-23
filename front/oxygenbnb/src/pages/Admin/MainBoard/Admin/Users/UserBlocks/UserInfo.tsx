import styles from "./Styles.module.scss";
import Avatar from "@mui/joy/Avatar";
import InputComponent from "../../InputComponent";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../../../../../../../../back/oxygenbnb/src/tables/user/entities/user.entity";

const UserInfo = ({ id, userData }) => {
  const { t } = useTranslation(["admin"]);

  return (
    <Accordion defaultExpanded sx={{ backgroundColor: "#0A0E0F" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #32383e",
          borderRadius: "10px",
        }}
      >
        <PersonRoundedIcon />
        &nbsp;{t("admin:admin.users.user_blocks.user_info_tsx.summary")}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Avatar />
            <InputComponent
              label={t(
                "admin:admin.users.user_blocks.user_info_tsx.list.firstname"
              )}
              value={userData?.firstname}
              disabled={true}
            />
            <InputComponent
              label={t(
                "admin:admin.users.user_blocks.user_info_tsx.list.lastname"
              )}
              value={userData?.lastname}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("admin:admin.users.user_blocks.user_info_tsx.list.id")}
              value={id}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.user_blocks.user_info_tsx.list.email"
              )}
              value={userData?.email}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("admin:admin.users.user_blocks.user_info_tsx.list.role")}
              value={userData?.role}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.user_blocks.user_info_tsx.list.created_at"
              )}
              value={userData?.created_at}
              disabled={true}
            />
            <InputComponent
              label={t(
                "admin:admin.users.user_blocks.user_info_tsx.list.gender"
              )}
              value={userData?.info?.gender}
              disabled={true}
            />
            <InputComponent
              label={t(
                "admin:admin.users.user_blocks.user_info_tsx.list.birthdate"
              )}
              value={userData?.info?.birth_date}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.user_blocks.user_info_tsx.list.description"
              )}
              value={userData?.info?.desciption}
              disabled={true}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserInfo;
