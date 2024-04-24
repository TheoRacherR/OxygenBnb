import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "@mui/joy/Avatar";
import styles from "./BottomBand.module.scss";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import List from "@mui/joy/List";
import { useTranslation } from "react-i18next";

const BottomBand = () => {
  const { t } = useTranslation(["admin_default"]);

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
                // display: "flex",
                // justifyContent: "space-between",
              }}
              selected={
                location.pathname === "/admin/renter/settings" ||
                location.pathname === "/admin/renter/settings/"
              }
            >
              <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                <SettingsRoundedIcon fontSize="small" />
              </ListItemDecorator>
              {t("admin_default:admin.bottom_band_tsx.settings")}
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider sx={{ my: 3 }} />

      <div className={styles.avatar_container}>
        <Avatar />
        <div className={styles.infos}>
          <div className={styles.itop}>mail@gmail.com</div>
          <div className={styles.ibot}>Théo R.</div>
        </div>
        <LogoutRoundedIcon
          sx={{ fontSize: 20, cursor: "pointer", margin: "auto 0" }}
        />
      </div>
    </>
  );
};

export default BottomBand;
