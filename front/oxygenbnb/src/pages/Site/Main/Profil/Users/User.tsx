import styles from "./User.module.scss";
// import { useTranslation } from "react-i18next";
import UserInfo from "./UserBlocks/UserInfo";
import LocationList from "./UserBlocks/LocationList";
import ReservationList from "./UserBlocks/ReservationList";
import { getUserInfos } from "@utils/utils";
import { useEffect, useState } from "react";

const User = () => {
  const [userInfos, setUserInfos] = useState<{ id: number; firstname: string; lastname: string; email: string; role: string }>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    role: ""
  })
  const getUsr = async () => {
    const infos = await getUserInfos();
    setUserInfos(infos);
  }
  useEffect(() => {
    getUsr();
  }, [])
  
  return (
    <div className={styles.container}>
        <div className={styles.main_list}>
          {
            userInfos.id > 0 ?
            <>
              <UserInfo userInfos={userInfos}/>
              <LocationList user_id={userInfos.id}/>
              <ReservationList user_id={userInfos.id}/>
            </>
            :
            <></>
          }
        </div>
      </div>
  );
};

export default User;
