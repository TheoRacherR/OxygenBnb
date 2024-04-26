import React from "react";
import TabPanel from "@mui/joy/TabPanel";
import styles from "./Manage.module.scss";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/fr";

const Manage = ({ value }) => {
  const handleChangeDates = (type, date) => {
    console.log(type + " " + date);
  };
  return (
    <TabPanel value={value}>
      <div className={styles.main_container}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <DateCalendar
            referenceDate={dayjs("2022-04-17")}
            views={["year", "month", "day"]}
            showDaysOutsideCurrentMonth
            // loading
          />
          {/* <DatePicker
            format="MM/DD/YYYY"
            sx={{ width: "100%" }}
            label="Test"
            minDate={dayjs(new Date())}
            onChange={value => handleChangeDates("start", value)}
          /> */}
        </LocalizationProvider>
      </div>
    </TabPanel>
  );
};

export default Manage;

/*
  reservation: Reservation;
  date: RentalDate;
*/
