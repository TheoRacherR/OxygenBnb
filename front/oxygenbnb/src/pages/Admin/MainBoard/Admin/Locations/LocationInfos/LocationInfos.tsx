import styles from "./LocationInfos.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputComponent from "../../InputComponent";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { useTranslation } from "react-i18next";

const enumCurrency = [
  "€ (euro)",
  "£ (pound)",
  "$ (us dollar)",
  "¥ (japan yen)",
  "Ұ (china yuan)",
  "₩ (south-korean won)",
];

const locationData = {
  id: 1,
  title: "",
  price: 300,
  default_currency: enumCurrency[0],
  type: "Hostel",
  isValid: true,
  owner: "Théo RACHER RAULIN",
  active: true,
};

const LocationInfos = ({ location_id }) => {
  const { t } = useTranslation(["admin_admin"]);

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
        <AssignmentRoundedIcon />
        &nbsp;
        {t("admin_admin:locations.location_infos.location_infos_tsx.summary")}
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
            <InputComponent
              label={t(
                "admin_admin:locations.location_infos.location_infos_tsx.list.id"
              )}
              value={location_id}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin_admin:locations.location_infos.location_infos_tsx.list.title"
              )}
              value={locationData.title}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin_admin:locations.location_infos.location_infos_tsx.list.price"
              )}
              value={`${
                locationData.price
              } ${locationData.default_currency.substring(0, 1)}`}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin_admin:locations.location_infos.location_infos_tsx.list.type"
              )}
              value={locationData.type}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin_admin:locations.location_infos.location_infos_tsx.list.valid"
              )}
              value={
                locationData.isValid ? 
                  t("admin_admin:locations.location_infos.location_infos_tsx.list.true")
                : 
                  t("admin_admin:locations.location_infos.location_infos_tsx.list.false")
              }
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin_admin:locations.location_infos.location_infos_tsx.list.owner"
              )}
              value={locationData.owner}
              disabled={true}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin_admin:locations.location_infos.location_infos_tsx.list.active"
              )}
              value={locationData.active ? "true" : "false"}
              disabled={true}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default LocationInfos;
