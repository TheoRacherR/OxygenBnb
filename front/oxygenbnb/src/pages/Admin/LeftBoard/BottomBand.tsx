import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "@mui/joy/Avatar";
import styles from "./BottomBand.module.scss";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import List from "@mui/joy/List";
import { useTranslation } from "react-i18next";
import { getUserInfos } from "@utils/utils";
import { useEffect, useState } from "react";

const BottomBand = () => {
  const { t } = useTranslation(["admin"]);
  const navigate = useNavigate();

  const [userInfos, setUserInfos] = useState<{ id: number; firstname: string; lastname: string; email: string; role: string }>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    role: ""
  })
  const getUsr = async () => {
    const infos = await getUserInfos();
    setUserInfos(infos);
  }

  const logout = () => {
    localStorage.setItem('jwtToken', "")
    console.log("update jwt")
    return navigate("/")
  }

  useEffect(() => {
    getUsr();
  }, [])
  

  return (
    <>
      <List
        sx={{
          maxWidth: 300,
          borderRadius: "sm",
          padding: "10px 0",
          rowGap: "8px",
        }}
      >
        <Link to="renter/settings">
          <ListItem>
            <ListItemButton
              sx={{
                borderRadius: "5px",
                color: location.pathname.startsWith("/admin/renter/settings")
                  ? "#0A0E0F"
                  : "white",
                // display: "flex",
                // justifyContent: "space-between",
              }}
              selected={location.pathname.startsWith("/admin/renter/settings")}
            >
              <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                <SettingsRoundedIcon fontSize="small" />
              </ListItemDecorator>
              {t("admin:default.bottom_band_tsx.settings")}
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider sx={{ my: 1 }} />

      <div className={styles.avatar_container}>
        <Avatar />
        <div className={styles.infos}>
          <div className={styles.itop}>{userInfos?.email}</div>
          <div className={styles.ibot}>{userInfos?.firstname} {userInfos?.lastname?.substring(0,1)}</div>
        </div>
        <LogoutRoundedIcon
          sx={{ fontSize: 20, cursor: "pointer", margin: "auto 0" }}
          onClick={logout}
        />
      </div>
    </>
  );
};

export default BottomBand;
