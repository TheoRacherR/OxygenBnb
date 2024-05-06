import styles from "./ReservationPage.module.scss";
import { useParams } from "react-router-dom";
import ReservationInfos from "./ReservationInfos";
import Discussion from "./Discussion";
import { useEffect } from "react";

const reservationData = {
  location_id: 3,
  discussion_id: 4,
};

const ReservationPage = () => {
  const { id } = useParams();
  useEffect(() => {
    window.scroll(0, 0)
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.main_list}>
        <ReservationInfos reservation_id={id} />
        <Discussion
          location_id={reservationData.location_id}
          discussion_id={reservationData.discussion_id}
        />
      </div>
    </div>
  );
};

export default ReservationPage;
