import { useEffect, useRef } from "react";
import styles from "./ListMessages.module.scss";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const ListMessages = ({ listOfMessages }) => {
  const { t } = useTranslation(["admin"]);
  const formatDate = t(
    "admin:renter.messages.discussion.list_messages.list_messages_tsx.format"
  );
  const messageEl = useRef(null);
  const listOfMessagesGrouped = listOfMessages.map((m) =>
    dayjs(m.date).format(formatDate)
  );
  const listOfDates = [...new Set(listOfMessagesGrouped)];

  useEffect(() => {
    document.getElementById("anchor")?.scrollIntoView();
  });

  return (
    <div
      className={styles.message_list_container}
      id="message_list_container"
      ref={messageEl}
    >
      {listOfDates.map((dateItem: string, dateIndex: number) => (
        <div key={dateIndex}>
          <div className={styles.title_month_year}>
            {dateItem === dayjs(new Date()).format(formatDate)
              ? t(
                  "admin:renter.messages.discussion.list_messages.list_messages_tsx.today"
                )
              : dateItem ===
                dayjs(new Date().setDate(new Date().getDate() - 1)).format(
                  formatDate
                )
              ? t(
                  "admin:renter.messages.discussion.list_messages.list_messages_tsx.yesterday"
                )
              : dateItem}
          </div>

          {listOfMessages.map((item, index) =>
            dateItem === dayjs(item.date).format(formatDate) ? (
              <div
                key={index}
                className={styles.message}
                id={
                  index === listOfMessages.length - 1 ? "anchor" : "not_anchor"
                }
              >
                <div
                  key={index}
                  className={
                    item.ownerOfThisMessage
                      ? styles.time_this_user
                      : styles.time_not_this_user
                  }
                >
                  {dayjs(item.date).format(
                    `${t(
                      "admin:renter.messages.discussion.list_messages.list_messages_tsx.format"
                    )} hh:mm`
                  )}
                </div>
                <div
                  className={
                    item.ownerOfThisMessage
                      ? styles.message_this_user
                      : styles.message_not_this_user
                  }
                >
                  {item.message}
                </div>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ListMessages;
