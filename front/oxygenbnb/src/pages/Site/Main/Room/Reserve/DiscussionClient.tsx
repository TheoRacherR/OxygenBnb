import React, { useEffect, useRef, useState } from 'react'
import styles from "./DiscussionClient.module.scss"
import axios from 'axios';
import { Messages } from '../../../../../../../../back/oxygenbnb/src/tables/messages/entities/messages.entity';
import { UserDataInterface } from '@pages/Admin/MainBoard/Renter/Messages/Discussion/Discussion';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfos } from '@utils/utils';
import { Conversation } from '../../../../../../../../back/oxygenbnb/src/tables/conversation/entities/conversation.entity';
import dayjs from 'dayjs';
import { Input, Button } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import io, { Socket } from 'socket.io-client';
import { MessageFormated } from '../../../../../../../../back/oxygenbnb/src/tables/messages/messages.service';


const DiscussionClient = () => {
  const { t } = useTranslation(["admin"]);
  const [message, setMessage] = useState("");
  // const [buttonClicked, setButtonClicked] = useState(false)
  const [messagesData, setMessagesData] = useState<MessageFormated[]>([])
  const [conversationData, setConversationData] = useState<Conversation>()
  const [userInfos, setUserInfos] = useState<UserDataInterface>()
  const { rental_id, conversation_id } = useParams();
  const [socket, setSocket] = useState<Socket>()
  const navigate = useNavigate();



  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_NODE_ENV_DEV
      ? import.meta.env.VITE_URL_NEST_DEV
      : import.meta.env.VITE_URL_NEST_PROD)
      setSocket(newSocket)
  }, [setSocket]);

  const formatDate = t("admin:renter.messages.discussion.list_messages.list_messages_tsx.format");

  useEffect(() => {
    window.scroll(0,0);
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    document.getElementsByTagName("footer")[0]?.parentNode.removeChild(document.getElementsByTagName("footer")[0])
    document.getElementById("msg").style.minHeight = "initial";
  }, [])

  const fetchMessages = async () => {
    const messagesRaw: { data: Messages[] } = await axios.get(`/message/${conversation_id}/limit/${0}`);
    setMessagesData(messagesRaw.data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
  };

  const fetchConversation = async () => {
    try {
      const conversationRaw: { data: Conversation} = await axios.get(`/conversation/${conversation_id}`);
      setConversationData(conversationRaw.data);
    }
    catch (e) {
      if (e.response.status === 404) return navigate("/o/404");
    }
  }

  const usr = async () => {
    const infos = await getUserInfos();
    console.log(conversationData?.client?.id);
    console.log(infos?.id);
    if(conversationData?.client?.id === infos?.id)
      setUserInfos(infos);
    else
      return navigate('/o/404');
  }

  useEffect(() => {
    if(conversationData) {
      usr();
    }
    else fetchConversation();

  }, [conversationData]);

  useEffect(() => {
    if(userInfos) fetchMessages();
    else usr();
  }, [userInfos])


  const handleSendMessage = async () => {
    if(message !== "" ){
      socket?.emit('message', { data: message})
      const new_msg = await axios.post("message", {
        text: message,
        owner: userInfos.id,
        conversation: conversation_id
      })
      if( new_msg.status === 201) setMessage("");
      document.getElementById("anchor").scrollIntoView();
    }
  }

  const messageListener = (message: { data: string }) => {
    setMessagesData([...messagesData, {
      id: messagesData.length,
      created_at: new Date(),
      text: message.data,
      owner: conversationData.client,
    }])
  }

  useEffect(() => {
    socket?.on('message', messageListener);
    return () => { socket?.off('message', messageListener) }
  }, [messageListener])

  const messageEl = useRef(null);
  const listOfMessagesGrouped = messagesData.map((m) =>
    dayjs(m.created_at).format(formatDate)
  );
  const listOfDates = [...new Set(listOfMessagesGrouped)];

  // useEffect(() => {
  //   console.log(listOfMessagesGrouped)
  //   console.log(messagesData)
  // }, [listOfMessagesGrouped])

  // useEffect(() => {
  //   document.getElementById("anchor")?.scrollIntoView();
  // });


  return (
    <div className={styles.main_container_info}>

      <div className={styles.messages}>
        <div
          className={styles.message_list_container}
          // style={{ height: `calc(100vh-38px)`}} 
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

              {messagesData.map((item, index) => (
                dateItem === dayjs(item.created_at).format(formatDate) ? (
                  <div
                    key={index + item.text}
                    className={styles.message}
                    id={
                      index === messagesData.length - 1 ? "anchor" : "not_anchor"
                    }
                  >
                    <div
                      // key={index} 
                      className={
                        item.owner.id === userInfos.id
                          ? styles.time_this_user
                          : styles.time_not_this_user
                      }
                    >
                      {dayjs(item.created_at).format(
                        `${t(
                          "admin:renter.messages.discussion.list_messages.list_messages_tsx.format"
                        )} hh:mm`
                      )}
                    </div>
                    <div
                      className={
                        item.owner.id === userInfos.id
                          ? styles.message_this_user
                          : styles.message_not_this_user
                      }
                    >
                      {item.text}
                    </div>
                  </div>
                ) : (
                  // <div style={{color: "white"}}>{dateItem + dayjs(item.created_at).format(formatDate)}</div>
                  <span key={index + item.text}></span>
                )
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.form_messages}>
        <div className={styles.textarea}>
          <Input
            placeholder={t(
              "admin:renter.messages.discussion.form_message.form_message_tsx.placeholder"
            )}
            variant="outlined"
            color="neutral"
            sx={{
              width: "100%",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            endDecorator={
              <Button
                sx={{ borderRadius: "6px" }}
                endDecorator={<SendRoundedIcon fontSize="small" />}
                size="sm"
                onClick={handleSendMessage}
              >
                {t(
                  "admin:renter.messages.discussion.form_message.form_message_tsx.button_send"
                )}
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default DiscussionClient