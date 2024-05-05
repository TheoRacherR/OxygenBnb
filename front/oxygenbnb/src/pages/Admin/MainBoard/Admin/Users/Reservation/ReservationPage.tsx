import React from "react";
import TopLevelPanel from "../../../TopLevelPanel";
import styles from "./ReservationPage.module.scss";
import { useParams } from "react-router-dom";
import ReservationInfos from "./ReservationInfos";
import Discussion from "./Discussion";

const reservationData = {
  reservation_infos: {},
  discussion_id: 4
};

const ReservationPage = () => {
  const { location_id, reservation_id } = useParams();
  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={`Reservation n°${reservation_id}`}
        currentPageTitle={`Reservation ${reservation_id}`}
        pathValues={[
          {
            name: `Locations n°${location_id}`,
            path: `/admin/location/${location_id}`,
          },
        ]}
      />
      <div className={styles.main_list}>
        <ReservationInfos reservation_id={reservation_id} />
        <Discussion
          location_id={location_id}
          discussion_id={reservationData.discussion_id}
        />
      </div>
    </div>
  );
};

export default ReservationPage;
