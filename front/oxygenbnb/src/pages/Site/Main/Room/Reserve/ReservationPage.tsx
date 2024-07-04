import { useTranslation } from "react-i18next";
import Dates from "./Blocks/Dates";
import Login from "./Blocks/Login";
import Payments from "./Blocks/Payments";
import TotalPrice from "./Blocks/TotalPrice";
import styles from "./ReservationPage.module.scss";
import Divider from "./Divider";
import dayjs from "dayjs";
import { SearchContext } from "@utils/Context/SearchContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Rental } from "../../../../../../../../back/oxygenbnb/src/tables/rental/entities/rental.entity";
import { getUserInfos } from "@utils/utils";

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
  const idRoom = url.substring("room/".length, url.length - "/reservation".length);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{id: number, firstname: string, lastname: string, email: string, role: stirng}>()
  const [locationData, setLocationData] = useState<Rental>();
  const fetchLocation = async () => {
    if (
      !idRoom
        .split("")
        .map((i) => parseInt(i))
        .includes(NaN)
    ) {
      try {
        const locationRaw: { data: Rental } = await axios.get(`/rental/${idRoom}`);
        setLocationData(locationRaw.data);
        if (!locationRaw.data.active && userData.id !== locationRaw.data.owner.id) return navigate("/o/404");
      } catch (e) {
        if (e.response.status === 404) {
          console.log("error")
          return navigate("/o/404");
        }
      }
    } else {
      console.log("error")
      return navigate("/o/404");
    }
  };

  const fetchUserData = async () => {
    const usr = await getUserInfos();
    if(usr)
      setUserData(usr)
  }

  useEffect(() => {
    if(userData) fetchLocation();
    else fetchUserData();
  }, [userData]);

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
            {
              locationData ?
                <TotalPrice
                  details={{
                    id: locationData.id,
                    title: locationData.title,
                    currency: locationData.default_currency,
                    nb_night: numberOfNightSelected,
                    price_per_night: locationData.default_price,
                    cleaning_fees: room_details.cleaning_fees,
                    service_fees: room_details.service_fees,
                    taxes: room_details.taxes,
                  }}
                  renter_id={locationData.owner.id}
                />
              :
              <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
