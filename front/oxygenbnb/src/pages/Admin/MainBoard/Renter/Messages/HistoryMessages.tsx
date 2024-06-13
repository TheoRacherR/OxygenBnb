import Avatar from "@mui/joy/Avatar";
import styles from "./HistoryMessages.module.scss";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageContext } from "../../../../../utils/Context/MessageContext";
import StatusComponent from "./StatusComponent";

const data: {
  discussion_id: number;
  user_id: number;
  firstname: string;
  lastname: string;
  online: boolean;
  last_message: {
    seen: boolean;
    message: string;
    user_id: number;
    date: Date;
  };
  location_id: number;
}[] = [
  {
    discussion_id: 1,
    user_id: 3,
    firstname: "Théo",
    lastname: "RACHER RAULIN",
    online: true,
    last_message: {
      seen: true,
      message: "Bonjour, pourriez-vous m'indiquer l'adresse du plombier ?",
      user_id: 3,
      date: new Date("2024-03-25 22:25:00"),
    },
    location_id: 2,
  },
  {
    discussion_id: 2,
    user_id: 5,
    firstname: "Franck",
    lastname: "GILBERT",
    online: true,
    last_message: {
      seen: false,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quaerat impedit rerum, natus deleniti suscipit. Hic maxime tempora debitis?",
      user_id: 5,
      date: new Date("2024-03-25 22:50:00"),
    },
    location_id: 1,
  },
  {
    discussion_id: 3,
    user_id: 1,
    firstname: "Léa",
    lastname: "DUSSANT",
    online: false,
    last_message: {
      seen: false,
      message:
        " Maxime tempore consequatur nesciunt voluptas id ab ratione sequi. Fugit, fuga.",
      user_id: 3,
      date: new Date("2024-03-22 00:00:00"),
    },
    location_id: 9,
  },
  {
    discussion_id: 4,
    user_id: 9,
    firstname: "Emmanuel",
    lastname: "FLOP",
    online: true,
    last_message: {
      seen: true,
      message: "Salut",
      user_id: 5,
      date: new Date("2024-03-25 20:00:00"),
    },
    location_id: 2,
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
  const { t } = useTranslation(["admin"]);

  const { discussionSelected, setDiscussionSelected } =
    useContext(MessageContext);

  useEffect(() => {
    if (!discussionSelected) {
      if (data.length >= 1) {
        setDiscussionSelected(
          data.sort(
            (a, b) =>
              b.last_message.date.getTime() - a.last_message.date.getTime()
          )[0]
        );
      } else {
        setDiscussionSelected(null);
      }
    } else {
      setDiscussionSelected(discussionSelected);
    }
  });

  return (
    <div className={styles.history}>
      <List
        sx={{
          width: "100%",
          padding: "10px 0",
        }}
      >
        {data
          .sort(
            (a, b) =>
              b.last_message.date.getTime() - a.last_message.date.getTime()
          )
          .map((item, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #9fa6ad29" }}>
              <ListItemButton
                sx={{
                  borderRadius: "5px",
                  p: "12px 16px",
                  width: "calc(100% - 32px)",
                  color:
                    JSON.stringify(item) === JSON.stringify(discussionSelected)
                      ? "#0A0E0F"
                      : "white",
                }}
                selected={
                  JSON.stringify(item) === JSON.stringify(discussionSelected)
                }
                onClick={() => setDiscussionSelected(item)}
              >
                <div className={styles.container_info}>
                  <div className={styles.top_informations}>
                    <div className={styles.left_info}>
                      <Avatar sx={{ borderColor: "black" }}>
                        {item.firstname.substring(0, 1).toUpperCase()}
                      </Avatar>
                      {item.online ? (
                        <div
                          style={{
                            margin: "0 0 5px auto",
                            width: "fit-content",
                          }}
                        >
                          <StatusComponent color={"green"} />
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className={styles.infos_middle}>
                        {item.firstname}{" "}
                        {item.lastname.substring(0, 1).toUpperCase()}.
                      </div>
                    </div>
                    <div className={styles.right_info}>
                      {/* {t("admin:renter.messages.messages_tsx.title")} */}
                      <div>
                        {returnDateDiffAgo(item.last_message.date)[2] === "year"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.year`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.date
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.date
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.date)[2] ===
                            "month"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.month`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.date
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.date
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.date)[2] ===
                            "week"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.week`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.date
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.date
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.date)[2] ===
                            "day"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.day`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.date
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.date
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.date)[2] ===
                            "hour"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.hour`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.date
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.date
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.date)[2] ==
                            "minute"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.minute`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.date
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.date
                                )[1],
                              }
                            )
                          : t(
                              `admin:renter.messages.history_messages_tsx.second`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.date
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.date
                                )[1],
                              }
                            )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.summary_message}
                    style={{
                      fontWeight: item.last_message.seen ? "bold" : "normal",
                    }}
                  >
                    {item.last_message.message.substring(0, 30)}
                    {item.last_message.message.length > 30 ? "..." : ""}
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default HistoryMessages;
