import logo from "../../../assets/Logo OxBnb sans texte.png";
import styles from "./TopBand.module.scss";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { verifyRole } from "../../../utils/utils";
import { useEffect } from "react";

const TopBand = ({ location }) => {
  const { t } = useTranslation(["admin"]);
  let role = "";
  const checkRole = async () => {
    const result = await verifyRole();
    if (result === "renter" || result === "admin")
      role = result;
  };
  useEffect(() => {
    checkRole();
  });

  return (
    <>
      <div className={styles.img_logo}>
        <img
          src={logo}
          alt={t("admin:default.top_band_tsx.img_logo.alt_img")}
        />
        <p>{t("admin:default.top_band_tsx.title")}</p>
      </div>
      <div className={styles.listing_item}>
        <List
          sx={{
            maxWidth: 300,
            borderRadius: "sm",
            padding: "10px 0",
            rowGap: "8px",
          }}
        >
          {
            role === "renter" ? 
              <>
                <Link to="">
                  <ListItem>
                    <ListItemButton
                      sx={{
                        borderRadius: "5px",
                        color:
                          location.pathname === "" ||
                          location.pathname === "/§="
                            ? "#0A0E0F"
                            : "white",
                      }}
                      selected={
                        location.pathname === "/" ||
                        location.pathname === "/"
                      }
                    >
                      <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                        <HomeRoundedIcon fontSize="small" />
                      </ListItemDecorator>
                      {t("admin:default.top_band_tsx.listing_item.home")}
                    </ListItemButton>
                  </ListItem>
                </Link>

                <Link to="renter/locations">
                  <ListItem>
                    <ListItemButton
                      sx={{
                        borderRadius: "5px",
                        color: location.pathname.startsWith("/admin/renter/location")
                          ? "#0A0E0F"
                          : "white",
                      }}
                      selected={location.pathname.startsWith(
                        "/admin/renter/location"
                      )}
                    >
                      <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                        <AssignmentRoundedIcon fontSize="small" />
                      </ListItemDecorator>
                      {t("admin:default.top_band_tsx.listing_item.locations")}
                    </ListItemButton>
                  </ListItem>
                </Link>

                <Link to="renter/messages">
                  <ListItem>
                    <ListItemButton
                      sx={{
                        borderRadius: "5px",
                        color: location.pathname.startsWith("/admin/renter/messages")
                          ? "#0A0E0F"
                          : "white",
                        // display: "flex",
                        // justifyContent: "space-between",
                      }}
                      selected={location.pathname.startsWith(
                        "/admin/renter/messages"
                      )}
                    >
                      {/* <div> */}
                      <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                        <ForumRoundedIcon fontSize="small" />
                      </ListItemDecorator>
                      {t("admin:default.top_band_tsx.listing_item.messages")}
                      {/* </div> */}
                      {/* <Chip sx={{ backgroundColor: "#0b6bcb" }}>3</Chip> */}
                    </ListItemButton>
                  </ListItem>
                </Link>
              </>
            :
              <>
              <Link to="users/list">
                <ListItem>
                  <ListItemButton
                    sx={{
                      borderRadius: "5px",
                      color: location.pathname.startsWith("/admin/user")
                        ? "#0A0E0F"
                        : "white",
                    }}
                    selected={location.pathname.startsWith("/admin/user")}
                  >
                    <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                      <PeopleAltRoundedIcon fontSize="small" />
                    </ListItemDecorator>
                    {t("admin:default.top_band_tsx.listing_item.users")}
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to="locations/list">
                <ListItem>
                  <ListItemButton
                    sx={{
                      borderRadius: "5px",
                      color: location.pathname.startsWith("/admin/location")
                        ? "#0A0E0F"
                        : "white",
                    }}
                    selected={location.pathname.startsWith("/admin/location")}
                  >
                    <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                      <AssignmentRoundedIcon fontSize="small" />
                    </ListItemDecorator>
                    {t("admin:default.top_band_tsx.listing_item.locations")}
                  </ListItemButton>
                </ListItem>
              </Link>
              </>
          }

        </List>
      </div>
    </>
  );
};

export default TopBand;
