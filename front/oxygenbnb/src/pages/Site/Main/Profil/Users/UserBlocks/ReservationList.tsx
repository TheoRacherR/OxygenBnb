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
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ReservationFormated } from "../../../../../../../../../back/oxygenbnb/src/tables/reservation/reservation.service";
import axios from "axios";

const ReservationList = ({ user_id }) => {
  const { t } = useTranslation(["site"]);
  const [reservationListData, setReservationListData] = useState<
    ReservationFormated[]
  >([]);
  const fetchReservation = async () => {
    const reservationRaw: { data: ReservationFormated[] } = await axios.get(`/reservation/client/${user_id}`);
    setReservationListData(reservationRaw.data);
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <Accordion sx={{ backgroundColor: "#f0f0f0" }}>
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
        <CheckBoxRoundedIcon />
        &nbsp;
        {t("site:main.profil.users.user_blocks.reservation_list_tsx.summary")}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "f0f0f0",
          color: "black",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.main_list}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "10px",
              // padding: "10px",
              maxWidth: "100%",
              overflow: "auto",
              maxHeight: "100%",
              backgroundColor: "#f0f0f0",
              // borderColor: "grey",
            }}
          >
            {reservationListData.length === 0 ? (
              <div style={{ color: "black" }}>
                {t(
                  "site:main.profil.users.user_blocks.reservation_list_tsx.no_reservation"
                )}
              </div>
            ) : (
              <Table sx={{ borderRadius: 20, color: "black" }}>
                <thead>
                  <tr>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.reservation_list_tsx.table.id"
                      )}
                    </th>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.reservation_list_tsx.table.location_name"
                      )}
                    </th>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.reservation_list_tsx.table.start_date"
                      )}
                    </th>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.reservation_list_tsx.table.end_date"
                      )}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {reservationListData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.rental.title}</td>
                      <td>
                        {dayjs(item.start_date).format(
                          t(
                            "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.format"
                          )
                        )}
                      </td>
                      <td>
                        {dayjs(item.end_date).format(
                          t(
                            "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.format"
                          )
                        )}
                      </td>
                      <td>
                        <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                          <Link to={`/o/user/reservation/${item.id}`}>
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
