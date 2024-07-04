import Avatar from "@mui/joy/Avatar";
import styles from "./HistoryMessages.module.scss";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageContext } from "@utils/Context/MessageContext";
import StatusComponent from "./StatusComponent";
import { Messages } from "../../../../../../../../back/oxygenbnb/src/tables/messages/entities/messages.entity";
import axios from "axios";
import { getUserInfos } from "@utils/utils";
import { Conversation } from "../../../../../../../../back/oxygenbnb/src/tables/conversation/entities/conversation.entity";


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

const HistoryMessages = ({socket}: { socket: Socket}) => {
  const yes = true;
  const { t } = useTranslation(["admin"]);
  const [conversationData, setConversationData] = useState<{conversation: Conversation, last_message: Messages}[]>([])
  const [userInfos, setUserInfos] = useState<{ id: number; firstname: string; lastname: string; email: string; role: string }>()

  const { discussionSelected, setDiscussionSelected } =
    useContext(MessageContext);
  
  const fetchMessages = async () => {
    const conversationListData: { data: Conversation[] } = await axios.get(`/conversation/renter/${userInfos.id}`);
    const convData:{conversation: Conversation, last_message: Messages}[] = [];
    for (let conv = 0; conv < conversationListData.data.length; conv++) {
      const element = conversationListData.data[conv];
      const last_m: { data: Messages } = await axios.get(`/message/last/${element.id}`);
      convData.push({
        conversation: element,
        last_message: last_m.data
      })
    }
    if(convData.length > 0) {
      setConversationData(convData);
      if(!discussionSelected){
        localStorage.setItem("discussionSelected", JSON.stringify(convData[0]));
        setDiscussionSelected(convData[0]);
      }
    }
    else {
      localStorage.setItem("discussionSelected", "{}")
      setDiscussionSelected(null)
    }
  };

  const usr = async () => {
    const infos = await getUserInfos();
    setUserInfos(infos);
  }

  useEffect(() => {
    if(userInfos) fetchMessages();
    else usr();
  }, [userInfos]);

  const changeLatestMessage = () => {
    fetchMessages();
  }

  useEffect(() => {
    socket?.on('message', changeLatestMessage);
    return () => { socket?.off('message', changeLatestMessage) }
  }, [changeLatestMessage])

  // useEffect(() => {
  //   if (!discussionSelected) {
  //     if (conversationData.length > 0) {
  //       setDiscussionSelected(
  //         conversationData.sort(
  //           (a, b) =>
  //             b.last_message.created_at.getTime() - a.last_message.created_at.getTime()
  //         )[0].conversation.id
  //       );
  //       localStorage.setItem("discussionSelected", JSON.stringify(conversationData[0].conversation.id));
  //     } else {
  //       setDiscussionSelected(null);
  //       localStorage.setItem("discussionSelected", "{}");
  //     }
  //   } else {
  //     setDiscussionSelected(discussionSelected);
  //   }
  // });

  return (
    <div className={styles.history}>
      <List
        sx={{
          width: "100%",
          padding: "10px 0",
        }}
      >
        {
        conversationData.length > 0 ?
          conversationData
          .sort(
            (a, b) =>
              b.last_message.created_at.getTime() - a.last_message.created_at.getTime()
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
                        {item.last_message.owner.firstname.substring(0, 1).toUpperCase()}
                      </Avatar>
                      {yes ? (
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
                        {item.conversation.client.firstname.substring(0, 1).toUpperCase()}
                        {item.conversation.client.firstname.substring(1, item.conversation.client.firstname.length)}{" "}
                        {item.conversation.client.lastname.substring(0, 1).toUpperCase()}.
                      </div>
                    </div>
                    <div className={styles.right_info}>
                      {/* {t("admin:renter.messages.messages_tsx.title")} */}
                      <div>
                        {returnDateDiffAgo(item.last_message.created_at)[2] === "year"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.year`,
                              {
                                time: returnDateDiffAgo(item.last_message.created_at)[0],
                                plural: returnDateDiffAgo(item.last_message.created_at)[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.created_at)[2] ===
                            "month"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.month`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.created_at)[2] ===
                            "week"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.week`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.created_at)[2] ===
                            "day"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.day`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.created_at)[2] ===
                            "hour"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.hour`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[1],
                              }
                            )
                          : returnDateDiffAgo(item.last_message.created_at)[2] ==
                            "minute"
                          ? t(
                              `admin:renter.messages.history_messages_tsx.minute`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[1],
                              }
                            )
                          : t(
                              `admin:renter.messages.history_messages_tsx.second`,
                              {
                                time: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[0],
                                plural: returnDateDiffAgo(
                                  item.last_message.created_at
                                )[1],
                              }
                            )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.summary_message}
                    style={{
                      fontWeight: yes ? "bold" : "normal",
                    }}
                  >
                    {item.last_message.owner.id === userInfos.id ? t('admin:renter.messages.history_messages_tsx.you') : ''}
                    {item.last_message.text.substring(0, 30)}
                    {item.last_message.text.length > 30 ? '...' : ''}
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          ))
        :
        <ListItem sx={{ borderBottom: "1px solid #9fa6ad29" }}>
          <ListItemButton
            sx={{
              borderRadius: "5px",
              p: "12px 16px",
              width: "calc(100% - 32px)",
              color: "#0A0E0F"
            }}
            selected
          >
            <div className={styles.container_info}>
              <div
                className={styles.summary_message}
              >{t('admin:renter.messages.history_messages_tsx.no_conversation')}</div>
            </div>
          </ListItemButton>
        </ListItem>
        }
      </List>
    </div>
  );
};

export default HistoryMessages;
