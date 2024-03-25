import Input from "@mui/joy/Input";
import styles from "./Messages.module.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HistoryMessages from "./HistoryMessages";
import { useTranslation } from "react-i18next";

const Messages = () => {
  const { t } = useTranslation(['admin_renter']);

  return (
    <div className={styles.container}>
      <div className={styles.contact_container}>
        <div className={styles.title}>
          <h1>{t("admin_renter:renter.messages.messages_tsx.title")}</h1>
        </div>
        <div className={styles.search}>
          <Input
            placeholder={t("admin_renter:renter.messages.messages_tsx.search")}
            endDecorator={<SearchRoundedIcon />}
            sx={{ width: "100%", borderRadius: "6px"}}
          />
        </div>
        <HistoryMessages/>
      </div>

      <div className={styles.messages_container}>{t("admin_renter:renter.messages.messages_tsx.title")}</div>
    </div>
  );
};

export default Messages;
