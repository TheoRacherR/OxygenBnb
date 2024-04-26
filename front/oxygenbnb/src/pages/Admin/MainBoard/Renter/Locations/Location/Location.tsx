import { useParams } from "react-router-dom";
import styles from "./Location.module.scss";
import TopLevelPanel from "../../../TopLevelPanel";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import Informations from "./Tab/Informations";
import Request from "./Tab/Requests";
// import Manage from "./Tab/Manage";
import { useTranslation } from "react-i18next";

const Location = () => {
  const { id } = useParams();
  const { t } = useTranslation(["admin_renter"]);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TopLevelPanel
          title={`${t("admin_renter:renter.locations.location.location_tsx.toplevelpanel.title")}${id}`}
          currentPageTitle={t("admin_renter:renter.locations.location.location_tsx.toplevelpanel.currentPageTitle") + id}
          pathValues={[{name: t("admin_renter:renter.locations.locations_tsx.currentPageTitle"), path: "/admin/renter/locations"}]}
        />
      </div>
      <div className={styles.main_container}>
        <Tabs
          defaultValue={0}
          sx={{ height: "unset", minHeight: "100%", backgroundColor: "black" }}
        >
          <TabList>
            <Tab sx={{ color: "grey" }}>{t("admin_renter:renter.locations.location.location_tsx.tab_list.informations")}</Tab>
            <Tab sx={{ color: "grey" }}>{t("admin_renter:renter.locations.location.location_tsx.tab_list.request")}</Tab>
            {/* <Tab>Manage location</Tab> */}
          </TabList>
          <Informations value={0} />
          <Request value={1} />
          {/* <Manage value={2}/> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Location;
