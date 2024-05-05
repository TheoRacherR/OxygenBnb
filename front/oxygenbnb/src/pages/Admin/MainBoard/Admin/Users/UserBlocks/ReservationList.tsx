import React from "react";
import styles from "./Styles.module.scss";
import Input from "@mui/joy/Input";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputComponent from "./InputComponent";
import { red } from "@mui/material/colors";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";

import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useTranslation } from "react-i18next";

const dataTemp: {
  reservation_id: number;
  location_id: number;
  location_name: string;
  start_date: Date;
  end_date: Date;
}[] = [
  {
    reservation_id: 159,
    location_id: 4,
    location_name: "Frozen yoghurt",
    start_date: new Date(),
    end_date: new Date(),
  },
  {
    reservation_id: 237,
    location_id: 90,
    location_name: "Ice cream sandwich",
    start_date: new Date(),
    end_date: new Date(),
  },
  {
    reservation_id: 262,
    location_id: 5,
    location_name: "Eclair",
    start_date: new Date(),
    end_date: new Date(),
  },
  {
    reservation_id: 305,
    location_id: 12,
    location_name: "Cupcake",
    start_date: new Date(),
    end_date: new Date(),
  },
  {
    reservation_id: 356,
    location_id: 4,
    location_name: "Gingerbread",
    start_date: new Date(),
    end_date: new Date(),
  },
];

const ReservationList = ({ id }) => {
  const { t } = useTranslation(["admin_admin"]);

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
        &nbsp;Reservations for user {id}
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
            <Table sx={{ borderRadius: 20, color: "#fff" }}>
              <thead>
                <tr>
                  <th>Reservation ID</th>
                  <th>Location name</th>
                  <th>Date start</th>
                  <th>Date end</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataTemp.map((item, index) => (
                  <tr key={index}>
                    <td>{item.reservation_id}</td>
                    <td>{item.location_name}</td>
                    <td>{item.start_date.toLocaleString()}</td>
                    <td>{item.end_date.toLocaleString()}</td>
                    <td>
                      <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                        <Link to={`/admin/location/${item.location_id}/reservation/${item.reservation_id}`}>
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
          </Sheet>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReservationList;
