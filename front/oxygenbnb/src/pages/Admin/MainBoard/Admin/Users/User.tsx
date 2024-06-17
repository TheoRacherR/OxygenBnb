import { useNavigate, useParams } from "react-router-dom";
import styles from "./User.module.scss";
import { useTranslation } from "react-i18next";
import UserInfo from "./UserBlocks/UserInfo";
import LocationList from "./UserBlocks/LocationList";
import ReservationList from "./UserBlocks/ReservationList";
import TopLevelPanel from "../../TopLevelPanel";
import { useEffect, useState } from "react";
import { User } from "../../../../../../../../back/oxygenbnb/src/tables/user/entities/user.entity";
import axios from "axios";

const UserComponent = () => {
  const { id } = useParams();
  const { t } = useTranslation(["admin"]);
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User>();
  const fetchUser = async () => {
    if (
      !id
        .split("")
        .map((i) => parseInt(i))
        .includes(NaN)
    ) {
      try {
        const userRaw: { any; data: User } = await axios.get(
          "http://localhost:3333" + "/user/" + id
        );
        setUserData(userRaw.data);
      } catch (e) {
        if (e.response.status === 404) return navigate("/admin/404");
      }
    } else return navigate("/admin/404");
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
        <UserInfo id={id} userData={userData} />
        <LocationList id={id} />
        <ReservationList user_id={id} location_id={0} />
        {/* //todo change '0' */}
      </div>
    </div>
  );
};

export default UserComponent;
