import TopLevelPanel from "../../../TopLevelPanel";
import styles from "./ReservationPage.module.scss";
import { useParams } from "react-router-dom";
import ReservationInfos from "./ReservationInfos";
import Discussion from "./Discussion";
import { useTranslation } from "react-i18next";

const reservationData = {
  reservation_infos: {},
  discussion_id: 4
};

const ReservationPage = () => {
  const { t } = useTranslation(['admin_admin']);
  const { location_id, reservation_id } = useParams();
  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={`${t("admin_admin:users.reservation.reservation_page_tsx.title")} ${reservation_id}`}
        currentPageTitle={`${t("admin_admin:users.reservation.reservation_page_tsx.currentPageTitle")} ${reservation_id}`}
        pathValues={[
          {
            name: t("admin_admin:locations.location_list_tsx.currentPageTitle"),
            path: "/admin/locations/list",
          },
          {
            name: `${t("admin_admin:locations.location_page_tsx.currentPageTitle")} ${location_id}`,
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
