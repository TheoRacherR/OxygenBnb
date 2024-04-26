import TopLevelPanel from "../../TopLevelPanel"
import styles from "./Locations.module.scss"
import TableComponent from "./TableComponent"
import { useTranslation } from "react-i18next";

const dataTemp: {
  title: string,
  id: number,
  price: number,
  validated: boolean
}[] = [
  {
    title: "Frozen yoghurt",
    id: 159,
    price: 6,
    validated: true
  },
  {
    title: "Ice cream sandwich",
    id: 237,
    price: 9,
    validated: false
  },
  {
    title: "Eclair",
    id: 262,
    price: 16,
    validated: true
  },
  {
    title: "Cupcake",
    id: 305,
    price: 3.7,
    validated: true
  },
  {
    title: "Gingerbread",
    id: 356,
    price: 16,
    validated: true
  }
]

const Locations = () => {
  const { t } = useTranslation(["admin_renter"]);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TopLevelPanel
          title={t("admin_renter:renter.locations.locations_tsx.title")}
          currentPageTitle={t("admin_renter:renter.locations.locations_tsx.currentPageTitle")}
          pathValues={[]}
        />
      </div>
      <div className={styles.main_list}>
        <TableComponent data={dataTemp}/>
      </div>
    </div>
  )
}

export default Locations