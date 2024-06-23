import dayjs from "dayjs";
import styles from "./Infos.module.scss";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InputComponent from "../../InputComponent";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ReservationFormated } from "../../../../../../../../../back/oxygenbnb/src/tables/reservation/reservation.service";
import { useEffect, useState } from "react";

const ReservationInfos = ({ reservation_id }) => {
  const { t } = useTranslation(["site"]);

  const [reservationData, setReservationData] = useState<ReservationFormated>();
  const fetchReservation = async () => {
    const reservationRaw: { any; data: ReservationFormated } = await axios.get(`/reservation/${reservation_id}`);
    setReservationData(reservationRaw.data);
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <Accordion defaultExpanded sx={{ backgroundColor: "#f0f0f0" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: "#f0f0f0",
          color: "black",
          border: "1px solid #32383e",
          borderRadius: "10px",
        }}
      >
        <PersonRoundedIcon />
        &nbsp;
        {t("site:main.profil.users.reservation.reservation_infos_tsx.summary")}
        {reservation_id}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "#f0f0f0",
          color: "black",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.list_container}>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.id"
              )}
              value={reservation_id}
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.nb_night"
              )}
              value={reservationData?.nb_night}
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.reservation_date"
              )}
              value={dayjs(reservationData?.created_at).format("DD/MM/YYYY")}
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.from"
              )}
              value={dayjs(reservationData?.start_date).format("DD/MM/YYYY")}
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.to"
              )}
              value={dayjs(reservationData?.end_date).format("DD/MM/YYYY")}
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.total_price"
              )}
              value={
                reservationData?.price_per_night * reservationData?.nb_night +
                " " +
                reservationData?.rental?.default_currency.substring(0, 1)
              }
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
          </div>

          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.nb_person"
              )}
              value={reservationData?.nb_adult}
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
            {/* <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.nb_person"
              )}
              value={reservationData?.nb_children}
              disabled={true}
            /> */}
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.total_price"
              )}
              value={
                reservationData?.total_fees +
                " " +
                reservationData?.rental?.default_currency.substring(0, 1)
              }
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
            <InputComponent
              label={t(
                "site:main.profil.users.reservation.reservation_infos_tsx.list.total_price"
              )}
              value={
                reservationData?.total_price +
                " " +
                reservationData?.rental?.default_currency.substring(0, 1)
              }
              disabled={true}
              onChange={() => setReservationData((prev) => ({ ...prev }))}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReservationInfos;
