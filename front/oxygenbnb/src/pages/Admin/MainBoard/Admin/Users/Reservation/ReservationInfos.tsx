import dayjs from "dayjs";
import styles from "./Infos.module.scss";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InputComponent from "../../InputComponent";
import { useTranslation } from "react-i18next";

const reservationData = {
  id: 2,
  reservation_date: new Date("08-20-2023"),
  start_date: new Date("08-10-2024"),
  end_date: new Date("08-17-2024"),
  price_per_night: 300,
  currency: "$ (US Dollar)",
  number_of_nights: 7,
  number_of_person: 8,
};

const ReservationInfos = ({ reservation_id }) => {
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
        &nbsp;
        {t("admin:admin.users.reservation.reservation_infos_tsx.summary")}
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
                "admin:admin.users.reservation.reservation_infos_tsx.list.id"
              )}
              value={reservation_id}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.nb_night"
              )}
              value={reservationData.number_of_nights}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.reservation_date"
              )}
              value={dayjs(reservationData.reservation_date).format(
                "DD/MM/YYYY"
              )}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.from"
              )}
              value={dayjs(reservationData.start_date).format("DD/MM/YYYY")}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.to"
              )}
              value={dayjs(reservationData.end_date).format("DD/MM/YYYY")}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.total_price"
              )}
              value={
                reservationData.price_per_night *
                  reservationData.number_of_nights +
                " " +
                reservationData.currency.substring(0, 1)
              }
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.nb_person"
              )}
              value={reservationData.number_of_person}
              disabled={true}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
    // </div>
  );
};

export default ReservationInfos;
