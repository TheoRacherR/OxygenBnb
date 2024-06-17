import { useTranslation } from "react-i18next";
import Dates from "./Blocks/Dates";
import Login from "./Blocks/Login";
import Payments from "./Blocks/Payments";
import TotalPrice from "./Blocks/TotalPrice";
import styles from "./ReservationPage.module.scss";
import Divider from "./Divider";
import dayjs from "dayjs";
import { SearchContext } from "../../../../../utils/Context/SearchContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Rental } from "../../../../../../../../back/oxygenbnb/src/tables/rental/entities/rental.entity";

const room_details = {
  cleaning_fees: 0,
  service_fees: 12.99,
  taxes: 0,
};

const ReservationPage = () => {
  const { t } = useTranslation(["site"]);
  const { nightSelected, numberOfNightSelected, numberOfPeopleSelected } =
    useContext(SearchContext);
  const url = useParams()["*"];
  const idRoom = url.substring(8, url.length - 12);
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<Rental>();
  const fetchLocation = async () => {
    if (
      !idRoom
        .split("")
        .map((i) => parseInt(i))
        .includes(NaN)
    ) {
      try {
        const locationRaw: { data: Rental } = await axios.get(
          "http://localhost:3333" + "/rental/" + idRoom
        );
        setLocationData(locationRaw.data);
      } catch (e) {
        if (e.response.status === 404) return navigate("/o/404");
      }
    } else return navigate("/o/404");
  };

  useEffect(() => {
    fetchLocation();
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>{t("site:main.room.reserve.reservation_page_tsx.title")}</h1>
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
                title: locationData?.title,
                currency: locationData?.default_currency,
                nb_night: numberOfNightSelected,
                price_per_night: locationData?.default_price,
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
