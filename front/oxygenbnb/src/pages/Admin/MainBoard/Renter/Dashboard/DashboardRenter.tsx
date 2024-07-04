import { useEffect, useState } from "react";
import TopLevelPanel from "../../TopLevelPanel";
import Chart from "./Chart";
import styles from "./DashboardRenter.module.scss";
import Pods from "./Pods";
import { getUserInfos } from "@utils/utils";
import axios from "axios";

const DashboardRenter = () => {
  const [data, setData] = useState<{
    nbRental: number;
    nbResa: number;
    nbRentalResa: number;
  }>({
    nbRental: 0,
    nbResa: 0,
    nbRentalResa: 0,
  });
  const [userId, setUserId] = useState<number>();

  const fetchDatas = async () => {
    const rentalsData: {data: number} = await axios.get(`/rental/data/${userId}`);
    const reservationData:{data: {total: number, unique: number}} = await axios.get(`/reservation/data/${userId}`);
    setData({
      nbRental: rentalsData.data,
      nbResa: reservationData?.data?.total,
      nbRentalResa: reservationData?.data?.unique,
    })
  };

  const fetchUserId = async () => {
    const userInfos = await getUserInfos();
    setUserId(userInfos.id);
  }

  useEffect(() => {
    fetchUserId();
    if(userId) fetchDatas();
  }, [userId]);
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TopLevelPanel
          title="Dashboard"
          currentPageTitle={""}
          pathValues={[]}
        />
      </div>
      <div className={styles.item_list}>
        {/* nombre de rental total */}
        <Pods title="Nombre total de mes locations" value={data.nbRental} />
        {/* nombre de rental resa */}
        <Pods title="Nombre total des reservaiton de mes locations" value={data.nbResa} />
        {/* nombre de resa total */}
        <Pods title="Nombre total de mes locations réservés" value={data.nbRentalResa} />

        {/* nombre de message */}
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
      </div>
    </div>
  );
};

export default DashboardRenter;
