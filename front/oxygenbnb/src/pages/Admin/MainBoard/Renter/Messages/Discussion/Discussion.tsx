import { getUserInfos } from "@utils/utils";
import styles from "./Discussion.module.scss";
import MainDiscussion from "./MainDiscussion";
import TopInfoDiscussion from "./TopInfoDiscussion";
import { useContext, useEffect, useState } from "react";
import { Messages } from "../../../../../../../../../back/oxygenbnb/src/tables/messages/entities/messages.entity";
import { Conversation } from "../../../../../../../../../back/oxygenbnb/src/tables/conversation/entities/conversation.entity";
import axios from "axios";
import { MessageContext } from "@utils/Context/MessageContext";
import { Socket } from "socket.io-client";

export interface UserDataInterface { id: number; firstname: string; lastname: string; email: string; role: string }

const Discussion = ({socket}: { socket: Socket}) => {
  const { discussionSelected } = useContext(MessageContext);
  const [conversationData, setConversationData] = useState<Conversation>()
  const [messagesData, setMessagesData] = useState<Messages[]>([])
  const [userInfos, setUserInfos] = useState<UserDataInterface>()

  const fetchMessages = async () => {
    if(discussionSelected){
      const conversationRaw: { data: Conversation } = await axios.get(`/conversation/${discussionSelected.conversation.id}`);
      const messagesRaw: { data: Messages[] } = await axios.get(`/message/${discussionSelected.conversation.id}/limit/${0}`);
      setConversationData(conversationRaw.data);
      setMessagesData(messagesRaw.data);
    }
    else {
      setConversationData(null);
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

  return (
    <div className={styles.container}>
      {
        conversationData ?
        <>
          <TopInfoDiscussion conversationData={conversationData}/>
          <MainDiscussion conversationData={conversationData} messagesData={messagesData} userData={userInfos} socket={socket} />
        </>
        :
        <>
        </>
      }
    </div>
  );
};

export default Discussion;
