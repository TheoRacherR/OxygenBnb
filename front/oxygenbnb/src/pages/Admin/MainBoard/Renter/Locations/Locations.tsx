import TopLevelPanel from "../../TopLevelPanel"
import styles from "./Locations.module.scss"
import TableComponent from "./TableComponent"

const dataTemp = [
  {
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },

  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9
  }
]

const Locations = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TopLevelPanel
          title="Locations"
          currentPageTitle={"Locations"}
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