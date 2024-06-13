import styles from "./Styles.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import axios from "axios";
import { ReservationFormated } from "../../../../../../../../../back/oxygenbnb/src/tables/reservation/reservation.service";
import { useEffect, useState } from "react";


const ReservationList = ({ user_id, location_id }) => {
  const { t } = useTranslation(["admin"]);
  const [reservationListData, setReservationListData] = useState<ReservationFormated[]>([]);
  const fetchReservation = async () => {
    const reservationRaw: { data: ReservationFormated[] } = await axios.get(
      "http://localhost:3333" + "/reservation/client/" + user_id
    );
    setReservationListData(reservationRaw.data);
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <Accordion sx={{ backgroundColor: "#0A0E0F" }}>
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
        <CheckBoxRoundedIcon />
        &nbsp;
        {user_id == 0
          ? `${t(
              "admin:admin.users.user_blocks.reservation_list_tsx.reservation_location"
            )} ${location_id}`
          : `${t(
              "admin:admin.users.user_blocks.reservation_list_tsx.reservation_user"
            )} ${user_id}`}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.main_list}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "10px",
              padding: "10px",
              maxWidth: "100%",
              overflow: "auto",
              maxHeight: "100%",
              backgroundColor: "#0A0E0F",
              borderColor: "grey",
            }}
          >
            {reservationListData.length === 0 ? (
              <div style={{ color: "white" }}>
                {t(
                  "admin:admin.users.user_blocks.reservation_list_tsx.no_reservation"
                )}
              </div>
            ) : (
              <Table sx={{ borderRadius: 20, color: "#fff" }}>
                <thead>
                  <tr>
                    <th>
                      {t(
                        "admin:admin.users.user_blocks.reservation_list_tsx.table.id"
                      )}
                    </th>
                    <th>
                      {t(
                        "admin:admin.users.user_blocks.reservation_list_tsx.table.location_name"
                      )}
                    </th>
                    <th>
                      {t(
                        "admin:admin.users.user_blocks.reservation_list_tsx.table.start_date"
                      )}
                    </th>
                    <th>
                      {t(
                        "admin:admin.users.user_blocks.reservation_list_tsx.table.end_date"
                      )}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {reservationListData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item?.rental?.localisation_infos}</td>
                      <td>{dayjs(item?.start_date).format(t('admin:admin.users.user_list_tsx.format'))}</td>
                      <td>{dayjs(item?.end_date).format(t('admin:admin.users.user_list_tsx.format'))}</td>
                      <td>
                        <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                          <Link
                            to={`/admin/location/${
                              location_id === 0 ? item?.rental?.id : location_id
                            }/reservation/${item.id}`}
                          >
                            <Button color="primary">
                              <ArrowForwardIosRoundedIcon fontSize="small" />
                            </Button>
                          </Link>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Sheet>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReservationList;
