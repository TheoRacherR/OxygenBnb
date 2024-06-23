import dayjs from "dayjs";
import styles from "./Infos.module.scss";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InputComponent from "../../InputComponent";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReservationFormated } from "../../../../../../../../../back/oxygenbnb/src/tables/reservation/reservation.service";

const ReservationInfos = ({ reservation_id }) => {
  const { t } = useTranslation(["admin"]);
  const [reservationData, setReservationData] = useState<ReservationFormated>();
  //todo add trad lines
  const fetchReservation = async () => {
    const reservationRaw: { any; data: ReservationFormated } = await axios.get(`/reservation/${reservation_id}`);
    setReservationData(reservationRaw.data);
  };

  useEffect(() => {
    fetchReservation();
  }, []);
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
              value={reservationData?.nb_night}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.reservation_date"
              )}
              value={dayjs(reservationData?.created_at).format(
                t("admin:admin.users.user_list_tsx.format")
              )}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.from"
              )}
              value={dayjs(reservationData?.start_date).format(
                t("admin:admin.users.user_list_tsx.format")
              )}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.to"
              )}
              value={dayjs(reservationData?.end_date).format(
                t("admin:admin.users.user_list_tsx.format")
              )}
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.to"
              )}
              value={
                reservationData?.canceled
                  ? t(
                      "admin:admin.locations.location_infos.location_infos_tsx.list.true"
                    )
                  : t(
                      "admin:admin.locations.location_infos.location_infos_tsx.list.false"
                    )
              }
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.total_price"
              )}
              value={
                reservationData?.price_per_night * reservationData?.nb_night +
                " " +
                reservationData?.rental?.default_currency.substring(0, 1)
              }
              disabled={true}
            />
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.nb_person"
              )}
              value={reservationData?.nb_adult}
              disabled={true}
            />
            {/* <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.nb_person"
              )}
              value={reservationData?.nb_children}
              disabled={true}
            /> */}
          </div>
          <div className={styles.item}>
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.total_price"
              )}
              value={
                reservationData?.total_fees +
                " " +
                reservationData?.rental?.default_currency.substring(0, 1)
              }
              disabled={true}
            />
            <InputComponent
              label={t(
                "admin:admin.users.reservation.reservation_infos_tsx.list.total_price"
              )}
              value={
                reservationData?.total_price +
                " " +
                reservationData?.rental?.default_currency.substring(0, 1)
              }
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
