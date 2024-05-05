import TopLevelPanel from "../../TopLevelPanel";
import ReservationList from "../Users/UserBlocks/ReservationList";
import LocationInfos from "./LocationInfos/LocationInfos";
import styles from "./LocationPage.module.scss";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LocationPage = () => {
  const { t } = useTranslation(['admin_admin']);
  const { id } = useParams();
  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={`${t("admin_admin:locations.location_page_tsx.title")} ${id}`}
        currentPageTitle={`${t("admin_admin:locations.location_page_tsx.currentPageTitle")} ${id}`}
        pathValues={[
          {
            name: t("admin_admin:locations.location_list_tsx.currentPageTitle"),
            path: "/admin/locations/list",
          },
        ]}
      />
      <div className={styles.main_list}>
        <LocationInfos location_id={id} />
        <ReservationList user_id={0} location_id={id}/>
      </div>
    </div>
  );
};

export default LocationPage;