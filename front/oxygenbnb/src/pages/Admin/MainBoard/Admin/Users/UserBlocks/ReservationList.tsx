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

const ReservationList = ({ user_id, location_id }) => {
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
        &nbsp;
        {
          user_id == 0 ?
            `${t("admin_admin:users.user_blocks.reservation_list_tsx.reservation_location")} ${location_id}`
          :
            `${t("admin_admin:users.user_blocks.reservation_list_tsx.reservation_user")} ${user_id}`
        }
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
            {dataTemp.length === 0 ? 
              <div style={{color: "white"}}>{t("admin_admin:users.user_blocks.reservation_list_tsx.no_reservation")}</div>
            : 
              <Table sx={{ borderRadius: 20, color: "#fff" }}>
                <thead>
                  <tr>
                    <th>{t("admin_admin:users.user_blocks.reservation_list_tsx.table.id")}</th>
                    <th>{t("admin_admin:users.user_blocks.reservation_list_tsx.table.location_name")}</th>
                    <th>{t("admin_admin:users.user_blocks.reservation_list_tsx.table.start_date")}</th>
                    <th>{t("admin_admin:users.user_blocks.reservation_list_tsx.table.end_date")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataTemp.map((item, index) => (
                    <tr key={index}>
                      <td>{item.reservation_id}</td>
                      <td>{item.location_name}</td>
                      <td>{dayjs(item.start_date).format("DD/MM/YYYY")}</td>
                      <td>{dayjs(item.end_date).format("DD/MM/YYYY")}</td>
                      <td>
                        <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                          <Link
                            to={`/admin/location/${location_id === 0 ? item.location_id : location_id}/reservation/${item.reservation_id}`}
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
            }
          </Sheet>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReservationList;
