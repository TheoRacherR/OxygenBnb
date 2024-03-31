import Input from "@mui/joy/Input";
import styles from "./Messages.module.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HistoryMessages from "./HistoryMessages";
import { useTranslation } from "react-i18next";
import Discussion from "./Discussion/Discussion";
import { useContext } from "react";
import {
  MessageContext,
  MessageContextProvider,
} from "../../../../../utils/Context/MessageContext";

const Messages = () => {
  const { t } = useTranslation(["admin_renter"]);
  const { discussionSelected } = useContext(MessageContext);

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
            sx={{ width: "100%", borderRadius: "6px" }}
          />
        </div>
        <HistoryMessages />
      </div>

      {discussionSelected ? <Discussion /> : <>{t("admin_renter:renter.messages.messages_tsx.no_message")}</>}
    </div>
  );
};

const MessageContainer = () => {
  return (
    <>
      <MessageContextProvider>
        <Messages />
      </MessageContextProvider>
    </>
  );
};

export default MessageContainer;
