import TopLevelPanel from "../../TopLevelPanel";
import ReservationList from "../Users/UserBlocks/ReservationList";
import LocationInfos from "./LocationInfos/LocationInfos";
import styles from "./LocationPage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RentalFormated } from "../../../../../../../../back/oxygenbnb/src/tables/rental/rental.service";
import axios from "axios";
import { useEffect, useState } from "react";

const LocationPage = () => {
  const { t } = useTranslation(["admin"]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [locationData, setLocationData] = useState<RentalFormated>();
  const fetchLocation = async () => {
    if(!id.split("").map(i => parseInt(i)).includes(NaN)){
      try {
        const locationRaw: { data: RentalFormated } = await axios.get(
          "http://localhost:3333" + "/rental/" + id
        );
        setLocationData(locationRaw.data);
        console.log("first")
      }
      catch (e) {
        if(e.response.status === 404 ) return navigate("/admin/404")
      }
    }
    else return navigate("/admin/404")
  };

  const handleValidate = async () => {
    await axios.patch("http://localhost:3333" + "/rental/" + id, { isValid: !locationData.isValid })
    console.log("update");
    fetchLocation();

  }

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={`${t("admin:admin.locations.location_page_tsx.title")} ${id}`}
        currentPageTitle={`${t(
          "admin:admin.locations.location_page_tsx.currentPageTitle"
        )} ${id}`}
        pathValues={[
          {
            name: t("admin:admin.locations.location_list_tsx.currentPageTitle"),
            path: "/admin/locations/list",
          },
        ]}
      />
      <div className={styles.main_list}>
        <LocationInfos location_id={id} locationData={locationData} handleValidate={handleValidate}/>
        <ReservationList user_id={0} location_id={id} />
      </div>
    </div>
  );
};

export default LocationPage;
