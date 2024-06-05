import Input from "@mui/joy/Input";
import styles from "./Messages.module.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HistoryMessages from "./HistoryMessages";
import { useTranslation } from "react-i18next";
import Discussion from "./Discussion/Discussion";
import { useContext } from "react";
import { MessageContext } from "../../../../../utils/Context/MessageContext";

const Messages = () => {
  const { t } = useTranslation(["admin"]);
  const { discussionSelected } = useContext(MessageContext);

  return (
    <div className={styles.container}>
      <div className={styles.contact_container}>
        <div className={styles.title}>
          <h1>{t("admin:renter.messages.messages_tsx.title")}</h1>
        </div>
        <div className={styles.search}>
          <Input
            placeholder={t("admin:renter.messages.messages_tsx.search")}
            endDecorator={<SearchRoundedIcon fontSize="small" />}
            sx={{ width: "100%", borderRadius: "6px" }}
          />
        </div>
        <HistoryMessages />
      </div>

      {discussionSelected ? (
        <Discussion />
      ) : (
        <>{t("admin:renter.messages.messages_tsx.no_message")}</>
      )}
    </div>
  );
};

export default Messages;
