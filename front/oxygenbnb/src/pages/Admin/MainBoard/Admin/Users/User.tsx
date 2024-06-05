import { useParams } from "react-router-dom";
import styles from "./User.module.scss";
import { useTranslation } from "react-i18next";
import UserInfo from "./UserBlocks/UserInfo";
import LocationList from "./UserBlocks/LocationList";
import ReservationList from "./UserBlocks/ReservationList";
import TopLevelPanel from "../../TopLevelPanel";

const User = () => {
  const { id } = useParams();
  const { t } = useTranslation(["admin"]);

  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={`${t("admin:admin.users.user_tsx.title")}${id}`}
        currentPageTitle={`${t(
          "admin:admin.users.user_tsx.currentPageTitle"
        )} ${id}`}
        pathValues={[
          {
            name: t("admin:admin.users.user_list_tsx.currentPageTitle"),
            path: "/admin/users/list",
          },
        ]}
      />
      <div className={styles.main_list}>
        <UserInfo id={id} />
        <LocationList id={id} />
        <ReservationList user_id={id} location_id={0} />
      </div>
    </div>
  );
};

export default User;
