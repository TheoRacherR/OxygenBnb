import styles from "./Styles.module.scss";
import Avatar from "@mui/joy/Avatar";
import InputComponent from "../../InputComponent";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../../../../../../../back/oxygenbnb/src/tables/user/entities/user.entity";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const UserInfo = ({ userInfos }) => {
  const { t } = useTranslation(["site"]);
  const [userData, setUserData] = useState<User>();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      if(userInfos.id > 0) {
        const userRaw: { any; data: User } = await axios.get(
          "http://localhost:3333" + "/user/" + userInfos.id
        );
        setUserData(userRaw.data);
      }
    } catch (e) {
      if (e.response.status === 404) {
        localStorage.setItem("jwtToken", "")
        console.log("update jwt")
      }
      return navigate("/")
    }
  };

  const handleEditUser = async () => {
    try {
      await axios.patch(
        "http://localhost:3333" + "/user/" + userInfos.id,
        {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email
        }
      )
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    window.scroll(0, 0);
    fetchUser();
    console.log("url" + process.env.REACT_APP_URL_NEST_DEV)
  }, []);

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
        &nbsp;{t("site:main.profil.users.user_blocks.user_info_tsx.summary")}
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
              label={t(
                "site:main.profil.users.user_blocks.user_info_tsx.list.firstname"
              )}
              value={userData?.firstname}
              onChange={(e) => setUserData(prev => ({...prev, firstname: e.target.value}))}
              disabled={false}
            />
            <InputComponent
              label={t(
                "site:main.profil.users.user_blocks.user_info_tsx.list.lastname"
              )}
              value={userData?.lastname}
              disabled={false}
              onChange={(e) => setUserData(prev => ({...prev, lastname: e.target.value}))}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.user_blocks.user_info_tsx.list.id"
              )}
              value={userData?.id}
              disabled={true}
              onChange={<></>}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.user_blocks.user_info_tsx.list.email"
              )}
              value={userData?.email}
              disabled={false}
              onChange={(e) => setUserData(prev => ({...prev, email: e.target.value}))}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.user_blocks.user_info_tsx.list.role"
              )}
              value={userData?.role}
              disabled={true}
              onChange={<></>}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.user_blocks.user_info_tsx.list.created_at"
              )}
              value={dayjs(userData?.created_at).format(t('site:main.room.room_tsx.date_picker_format'))}
              disabled={true}
              onChange={<></>}
            />
            <InputComponent
              label={t(
                "site:main.profil.users.user_blocks.user_info_tsx.list.updated_at"
              )}
              value={dayjs(userData?.updated_at).format(t('site:main.room.room_tsx.date_picker_format'))}
              disabled={true}
              onChange={<></>}
            />
          </div>
          <div
            className={styles.item}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Button sx={{ borderRadius: "6px" }} color="success" onClick={handleEditUser}>
              {t("site:main.profil.users.user_blocks.user_info_tsx.list.save")}
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserInfo;
