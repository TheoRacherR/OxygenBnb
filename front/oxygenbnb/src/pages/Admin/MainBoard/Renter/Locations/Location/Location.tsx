import { useParams } from "react-router-dom";
import styles from "./Location.module.scss";
import TopLevelPanel from "../../../TopLevelPanel";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import Informations from "./Tab/Informations";
import Request from "./Tab/Requests";
// import Manage from "./Tab/Manage";

const Location = () => {
  const { id } = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TopLevelPanel
          title={`My Location n°${id}`}
          currentPageTitle={"Locations"}
          pathValues={[]}
        />
      </div>
      <div className={styles.main_container}>
        <Tabs defaultValue={0} sx={{ height: "unset", minHeight: "100%", backgroundColor: "black" }}>
          <TabList>
            <Tab>Informations</Tab>
            <Tab>Requests</Tab>
            {/* <Tab>Manage location</Tab> */}
          </TabList>
            <Informations value={0}/>
            <Request value={1}/>
            {/* <Manage value={2}/> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Location;
