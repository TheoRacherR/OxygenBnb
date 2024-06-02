import { useTranslation } from "react-i18next";
import Dates from "./Blocks/Dates";
import Login from "./Blocks/Login";
import Payments from "./Blocks/Payments";
import TotalPrice from "./Blocks/TotalPrice";
import styles from "./ReservationPage.module.scss";
import Divider from "./Divider";
import dayjs from "dayjs";
import { SearchContext } from "../../../../../utils/Context/SearchContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const room_details = {
  price_per_night: 300,
  cleaning_fees: 0,
  service_fees: 12.99,
  taxes: 0,
  currency: "€ (euro)",
};

const ReservationPage = () => {
  const { t } = useTranslation(["site_main"]);
  const { nightSelected, numberOfNightSelected, numberOfPeopleSelected } = useContext(SearchContext);
  const url = useParams()["*"];
  const idRoom = url.substring(8, url.length - 12)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>{t("site_main:main.room.reserve.reservation_page_tsx.title")}</h1>
        <div className={styles.placements}>
          <div className={styles.left}>
            <Dates
              url={url}
              nightSelected={nightSelected}
              numberOfPeopleSelected={numberOfPeopleSelected}
            />
            {/* <Divider /> */}
            {/* <Payments /> */}
            <Divider />
            <Login />
          </div>
          <div className={styles.right}>
            <TotalPrice
              details={{
                title: "Grande maison bien bien hein",
                currency: room_details.currency,
                nb_night: numberOfNightSelected,
                price_per_night: room_details.price_per_night,
                cleaning_fees: room_details.cleaning_fees,
                service_fees: room_details.service_fees,
                taxes: room_details.taxes,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;