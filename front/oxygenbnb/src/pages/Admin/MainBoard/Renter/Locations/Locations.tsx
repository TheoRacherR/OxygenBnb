import { useEffect, useState } from "react";
import TopLevelPanel from "../../TopLevelPanel";
import styles from "./Locations.module.scss";
import TableComponent from "./TableComponent";
import { useTranslation } from "react-i18next";
import { RentalFormated } from "../../../../../../../../back/oxygenbnb/src/tables/rental/rental.service";
import axios from "axios";
import { getUserInfos } from "@utils/utils";

const Locations = () => {
  const { t } = useTranslation(["admin"]);
  const [locationListData, setLocationListData] = useState<RentalFormated[]>([]);
  const [userInfos, setUserInfos] = useState<{ id: number; firstname: string; lastname: string; email: string; role: string }>()

  const fetchLocations = async () => {
    const locationListRaw: { data: RentalFormated[] } = await axios.get(`/rental/owner/${userInfos.id}`);
    setLocationListData(locationListRaw.data);
  };

  const usr = async () => {
    const infos = await getUserInfos();
    setUserInfos(infos);
  }

  useEffect(() => {
    if(userInfos) fetchLocations();
    else usr();
  }, [userInfos]);
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TopLevelPanel
          title={t("admin:renter.locations.locations_tsx.title")}
          currentPageTitle={t(
            "admin:renter.locations.locations_tsx.currentPageTitle"
          )}
          pathValues={[]}
        />
      </div>
      <div className={styles.main_list}>
        <TableComponent data={locationListData} />
      </div>
    </div>
  );
};

export default Locations;
