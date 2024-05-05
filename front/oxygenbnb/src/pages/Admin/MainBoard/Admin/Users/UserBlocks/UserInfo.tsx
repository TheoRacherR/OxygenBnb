import React from "react";
import styles from "./Styles.module.scss";
import Input from "@mui/joy/Input";
import Avatar from "@mui/joy/Avatar";
import InputComponent from "./InputComponent";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const userData = {
  frist_name: "Théo",
  last_name: "RACHER RAULIN",
  email: "theo@gmail.com",
  role: "User",
  created_at: "10-08-2022",
  upated_at: "13-05-2024",
};

const UserInfo = ({id}) => {
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
        &nbsp;Infos
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
              label="Firstname"
              value={userData.frist_name}
              disabled={true}
            />
            <InputComponent
              label="Lastname"
              value={userData.last_name}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent label="ID" value={id} disabled={true} />
          </div>

          <div className={styles.item}>
            <InputComponent
              label="Email"
              value={userData.email}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent label="role" value={userData.role} disabled={true} />
          </div>

          <div className={styles.item}>
            <InputComponent
              label="Created At"
              value={userData.created_at}
              disabled={true}
            />
            <InputComponent
              label="Upated At"
              value={userData.upated_at}
              disabled={true}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
    // <div className={styles.wrapper}>
    // <div className={styles.title}>Infos</div>
    // <div className={styles.list_container}>
    //   <div className={styles.item}>
    //     <Avatar />
    //     <InputComponent label="Firstname" value="Théo" disabled={true} />
    //     <InputComponent label="Lastname" value="RACHER RAULIN" disabled={true} />
    //     {/* <div className={styles.name}>
    //       <div className={styles.first_name}>Théo</div>
    //       <div className={styles.last_name}>RACHER RAULIN</div>
    //     </div> */}
    //   </div>

    //   <div className={styles.item}>
    //     <InputComponent label="ID" value="1" disabled={true} />
    //   </div>

    //   <div className={styles.item}>
    //     <InputComponent label="Email" value="theo@gmail.com" disabled={true} />
    //   </div>

    //   <div className={styles.item}>
    //     <InputComponent label="role" value="User" disabled={true} />
    //   </div>

    //   <div className={styles.item}>
    //     <InputComponent label="Created At" value="10-08-2022" disabled={true} />
    //     <InputComponent label="Upated At" value="13-05-2024" disabled={true} />
    //   </div>

    // </div>
    // </div>
  );
};

export default UserInfo;
