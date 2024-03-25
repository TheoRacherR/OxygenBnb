import logo from "../../../assets/Logo OxBnb sans texte.png";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";


import styles from "./TopBand.module.scss";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { useTranslation } from "react-i18next";

import Chip from "@mui/joy/Chip";
import { Link } from "react-router-dom";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';


const TopBand = ({ location }) => {
  const { t } = useTranslation(["admin_default"]);

  return (
    <>
      <div className={styles.img_logo}>
        <img
          src={logo}
          alt={t("admin_default:admin.top_band_tsx.img_logo.alt_img")}
        />
        <p>{t("admin_default:admin.top_band_tsx.title")}</p>
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
          <Link to="">
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: "5px" }}
                selected={
                  location.pathname === "/admin" ||
                  location.pathname === "/admin/"
                }
              >
                <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                  <HomeRoundedIcon />
                </ListItemDecorator>
                {t("admin_default:admin.top_band_tsx.listing_item.home")}
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="renter/dashboard">
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: "5px" }}
                selected={
                  location.pathname === "/admin/renter/dashboard" ||
                  location.pathname === "/admin/renter/dashboard/"
                }
              >
                <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                  <DashboardRoundedIcon />
                </ListItemDecorator>
                {t("admin_default:admin.top_band_tsx.listing_item.dashboard")}
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="renter/locations">
            <ListItem>
              <ListItemButton
                sx={{ borderRadius: "5px" }}
                selected={
                  location.pathname === "/admin/renter/locations" ||
                  location.pathname === "/admin/renter/locations/"
                }
              >
                <ListItemDecorator sx={{ mr: 1, minInlineSize: "auto" }}>
                  <AssignmentRoundedIcon />
                </ListItemDecorator>
                {t("admin_default:admin.top_band_tsx.listing_item.locations")}
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="renter/messages">
            <ListItem>
              <ListItemButton
                sx={{
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                selected={
                  location.pathname === "/admin/renter/messages" ||
                  location.pathname === "/admin/renter/messages/"
                }
              >
                <div>
                  <ListItemDecorator>
                    <ForumRoundedIcon />
                  </ListItemDecorator>
                  {t("admin_default:admin.top_band_tsx.listing_item.messages")}
                </div>
                <Chip sx={{ backgroundColor: "#0b6bcb" }}>3</Chip>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </div>
    </>
  );
};

export default TopBand;
