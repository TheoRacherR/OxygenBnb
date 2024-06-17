import { useTranslation } from "react-i18next";
import styles from "./Styles.module.scss"

const Unauthorized = () => {
  const { t } = useTranslation(['errors'])
  return (
    <div className={styles.container}>
      <h1>{(t("errors:403"))}</h1>
    </div>
  )
}

export default Unauthorized;