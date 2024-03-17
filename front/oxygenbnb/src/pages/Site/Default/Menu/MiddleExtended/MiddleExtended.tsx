import { Button } from "@mui/material"
import styles from "./MiddleExtended.module.scss"
import { useState } from "react"

const MiddleExtended = () => {
  const [valuesSearch, setValuesSearch] = useState<{where: string, when_start: string, when_end: string, who: string}>({where: "", when_start: "", when_end: "", who: ""})
  return (
      <div className={styles.middle_extended}>
        <div className={styles.block}>
          <div className={styles.main_item}>
            <div className={styles.where}>
              {valuesSearch.where.length === 0 ? "Where ?" : valuesSearch.where}
            </div>
            <div className={styles.when_start}>
              {valuesSearch.when_start.length === 0 ? "From ?" : valuesSearch.when_start}
            </div>
            <div className={styles.when_end}>
              {valuesSearch.when_end.length === 0 ? "To ?" : valuesSearch.when_end}
            </div>
            <div className={styles.who}>
              {valuesSearch.who.length === 0 ? "Who ?" : valuesSearch.who}
            </div>
            <Button/>
          </div>
        </div>
        <div className={styles.block_onclick}></div>
      </div>
  )
}

export default MiddleExtended