import { useTranslation } from "react-i18next";
import styles from "./Styles.module.scss"

const NotFound = () => {
  const { t } = useTranslation(['errors'])
  return (
    <div className={styles.container}>
      <h1>{(t("errors:404"))}</h1>
    </div>
  )
}

export default NotFound;