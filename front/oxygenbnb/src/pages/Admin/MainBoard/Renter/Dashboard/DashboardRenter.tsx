import TopLevelPanel from "../../TopLevelPanel";
import Chart from "./Chart";
import styles from "./DashboardRenter.module.scss";
import Pods from "./Pods";

const pods = [
  {
    title: "Number",
  },
];

const DashboardRenter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TopLevelPanel
          title="Dashboard"
          currentPageTitle={"Dashboard"}
          pathValues={[]}
        />
      </div>
      <div className={styles.item_list}>
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        <Pods title="Ceci est un pods rgdfg rgergdfhdghb" value="0" />
        {/* <Chart title="Test" values=""/> */}
      </div>
    </div>
  );
};

export default DashboardRenter;
