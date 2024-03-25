import Avatar from "@mui/joy/Avatar";
import styles from "./HistoryMessages.module.scss";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const data = [
  {
    firstname: "Théo",
    lastname: "RACHER RAULIN",
    online: true,
    message: "Bonjour, pourriez-vous m'indiquer l'adresse du plombier ?",
    date_last_message: new Date("2024-03-25 22:25:00"),
  },
  {
    firstname: "Franck",
    lastname: "GILBERT",
    online: true,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quaerat impedit rerum, natus deleniti suscipit. Hic maxime tempora debitis?",
    date_last_message: new Date("2024-03-25 22:50:00"),
  },
  {
    firstname: "Léa",
    lastname: "DUSSANT",
    online: false,
    message:
      " Maxime tempore consequatur nesciunt voluptas id ab ratione sequi. Fugit, fuga.",
    date_last_message: new Date("2024-03-22 00:00:00"),
  },
  {
    firstname: "Emmanuel",
    lastname: "FLOP",
    online: true,
    message: "Salut",
    date_last_message: new Date("2024-03-25 20:00:00"),
  },
];

const returnDateDiffAgo = (date): [number, string, string] => {
  const diffYear = dayjs(new Date()).diff(date, "y");
  const diffMonth = dayjs(new Date()).diff(date, "M");
  const diffWeek = dayjs(new Date()).diff(date, "w");
  const diffDay = dayjs(new Date()).diff(date, "d");
  const diffHour = dayjs(new Date()).diff(date, "h");
  const diffMinute = dayjs(new Date()).diff(date, "m");
  const diffSecond = dayjs(new Date()).diff(date, "s");

  if (diffYear > 0) return [diffYear, `${diffYear > 1 ? "s" : ""}`, "year"];
  else if (diffMonth > 0)
    return [diffMonth, `${diffMonth > 1 ? "s" : ""}`, "month"];
  else if (diffWeek > 0)
    return [diffWeek, `${diffWeek > 1 ? "s" : ""}`, "week"];
  else if (diffDay > 0) return [diffDay, `${diffDay > 1 ? "s" : ""}`, "day"];
  else if (diffHour > 0)
    return [diffHour, `${diffHour > 1 ? "s" : ""}`, "hour"];
  else if (diffMinute > 0)
    return [diffMinute, `${diffMinute > 1 ? "s" : ""}`, "minute"];
  else return [diffSecond, `${diffSecond > 1 ? "s" : ""}`, "second"];
};

const HistoryMessages = () => {
  const { t } = useTranslation(["admin_renter"]);

  const [messageSelected, setMessageSelected] = useState(
    data.length >= 1
      ? data.sort(
          (a, b) =>
            b.date_last_message.getTime() - a.date_last_message.getTime()
        )[0]
      : null
  );
  return (
    <div className={styles.history}>
      <List
        sx={{
          width: "100%",
          padding: "10px 0",
          // borderRadius: "sm", rowGap: "8px",
        }}
      >
        {data
          .sort(
            (a, b) =>
              b.date_last_message.getTime() - a.date_last_message.getTime()
          )
          .map((item, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #9fa6ad29" }}>
              <ListItemButton
                sx={{
                  borderRadius: "5px",
                  p: "12px 16px",
                  width: "calc(100% - 32px)",
                }}
                selected={messageSelected === item}
                onClick={() => setMessageSelected(item)}
              >
                <div className={styles.container_info}>
                  <div className={styles.top_informations}>
                    <div className={styles.left_info}>
                      <Avatar>
                        {item.firstname.substring(0, 1).toUpperCase()}
                      </Avatar>
                      <div className={styles.infos_middle}>
                        {item.firstname}{" "}
                        {item.lastname.substring(0, 1).toUpperCase()}.
                      </div>
                    </div>
                    <div className={styles.right_info}>
                      {item.online ? (
                        <div className={styles.status}></div>
                      ) : (
                        <></>
                      )}
                      {/* {t("admin_renter:renter.messages.messages_tsx.title")} */}
                      <div>
                        {returnDateDiffAgo(item.date_last_message)[2] === "year"
                          ? t(
                              `admin_renter:renter.messages.history_messages_tsx.year`,
                              {
                                time: returnDateDiffAgo(
                                  item.date_last_message
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.date_last_message
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.date_last_message)[2] ===
                            "month"
                          ? t(
                              `admin_renter:renter.messages.history_messages_tsx.month`,
                              {
                                time: returnDateDiffAgo(
                                  item.date_last_message
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.date_last_message
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.date_last_message)[2] ===
                            "week"
                          ? t(
                              `admin_renter:renter.messages.history_messages_tsx.week`,
                              {
                                time: returnDateDiffAgo(
                                  item.date_last_message
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.date_last_message
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.date_last_message)[2] ===
                            "day"
                          ? t(
                              `admin_renter:renter.messages.history_messages_tsx.day`,
                              {
                                time: returnDateDiffAgo(
                                  item.date_last_message
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.date_last_message
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.date_last_message)[2] ===
                            "hour"
                          ? t(
                              `admin_renter:renter.messages.history_messages_tsx.hour`,
                              {
                                time: returnDateDiffAgo(
                                  item.date_last_message
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.date_last_message
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.date_last_message)[2] ==
                            "minute"
                          ? t(
                              `admin_renter:renter.messages.history_messages_tsx.minute`,
                              {
                                time: returnDateDiffAgo(
                                  item.date_last_message
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.date_last_message
                                )[1],
                              }
                            )
                          : t(
                              `admin_renter:renter.messages.history_messages_tsx.second`,
                              {
                                time: returnDateDiffAgo(
                                  item.date_last_message
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.date_last_message
                                )[1],
                              }
                            )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.summary_message}>
                    {item.message.substring(0, 30)}
                    {item.message.length > 30 ? "..." : ""}
                  </div>
                </div>
                {/* <div></div> */}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default HistoryMessages;
