import styles from "./User.module.scss";
// import { useTranslation } from "react-i18next";
import UserInfo from "./UserBlocks/UserInfo";
import LocationList from "./UserBlocks/LocationList";
import ReservationList from "./UserBlocks/ReservationList";

const User = () => {
  
  return (
    <div className={styles.container}>
        <div className={styles.main_list}>
          <UserInfo/>
          <LocationList/>
          <ReservationList />
        </div>
      </div>
  );
};

export default User;
