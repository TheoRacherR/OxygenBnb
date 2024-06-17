// import React from 'react'
import { useTranslation } from "react-i18next"
import styles from "./Forbidden.module.scss"

const Forbidden = () => {
  const { t } = useTranslation(['errors'])

  return (
    <div className={styles.container}>
      <h1>{t("errors:403")}</h1>
    </div>
  )
}

export default Forbidden