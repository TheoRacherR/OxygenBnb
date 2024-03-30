import { useEffect, useRef, useState } from "react";
import styles from "./ListMessages.module.scss";
import dayjs from "dayjs";

const ListMessages = ({ listOfMessages }) => {
  const formatDate = "DD/MM/YYYY"
  const messageEl = useRef(null);
  // const listOfMessagesGrouped = listOfMessages.group(({ date }) => dayjs(date).format('MM/YYYY'))
  const listOfMessagesGrouped = listOfMessages.map((m) =>
    dayjs(m.date).format(formatDate)
  );
  const listOfDates = [...new Set(listOfMessagesGrouped)];
  // console.log(listOfDates);

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
            {
              dateItem === dayjs(new Date()).format(formatDate) 
              ? "Today" 
              : dateItem === dayjs(new Date().setDate(new Date().getDate()-1)).format(formatDate) 
                ? "Yesterday" 
                : dateItem
            }
          </div>

          {listOfMessages.map((item, index) => (
            dateItem === dayjs(item.date).format(formatDate)
            ? <div
                key={index}
                className={styles.message}
                id={index === listOfMessages.length - 1 ? "anchor" : "not_anchor"}
              >
                <div
                  key={index}
                  className={
                    item.ownerOfThisMessage
                      ? styles.time_this_user
                      : styles.time_not_this_user
                  }
                >
                  {dayjs(item.date).format("DD/MM/YYYY hh:mm")}
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
            :
            <></>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListMessages;
