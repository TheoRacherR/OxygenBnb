import styles from "./Styles.module.scss";
import Avatar from "@mui/joy/Avatar";
import InputComponent from "../../InputComponent";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useTranslation } from "react-i18next";

const userData = {
  frist_name: "Théo",
  last_name: "RACHER RAULIN",
  email: "theo@gmail.com",
  role: "User",
  created_at: "10-08-2022",
  upated_at: "13-05-2024",
};

const UserInfo = ({ id }) => {
  const { t } = useTranslation(['admin_admin']);

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
        &nbsp;{t("admin_admin:users.user_blocks.user_info_tsx.summary")}
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
              label={t("admin_admin:users.user_blocks.user_info_tsx.list.firstname")}
              value={userData.frist_name}
              disabled={true}
            />
            <InputComponent
              label={t("admin_admin:users.user_blocks.user_info_tsx.list.lastname")}
              value={userData.last_name}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent label={t("admin_admin:users.user_blocks.user_info_tsx.list.id")} value={id} disabled={true} />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("admin_admin:users.user_blocks.user_info_tsx.list.email")}
              value={userData.email}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("admin_admin:users.user_blocks.user_info_tsx.list.role")}
              value={userData.role}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t("admin_admin:users.user_blocks.user_info_tsx.list.created_at")}
              value={userData.created_at}
              disabled={true}
            />
            <InputComponent
              label={t("admin_admin:users.user_blocks.user_info_tsx.list.updated_at")}
              value={userData.upated_at}
              disabled={true}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserInfo;
