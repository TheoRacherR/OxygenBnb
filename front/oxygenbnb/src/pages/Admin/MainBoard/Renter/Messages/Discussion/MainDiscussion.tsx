import styles from "./MainDiscussion.module.scss";
import ListMessages from "./ListMessages/ListMessages";
import { useEffect, useState } from "react";
import FormMessage from "./FormMessage/FormMessage";
import { MessageFormated } from "../../../../../../../../../back/oxygenbnb/src/tables/messages/messages.service";
import { Socket } from "socket.io-client";
import axios from "axios";
import { Conversation } from "../../../../../../../../../back/oxygenbnb/src/tables/conversation/entities/conversation.entity";
import { Messages } from "../../../../../../../../../back/oxygenbnb/src/tables/messages/entities/messages.entity";
import { UserDataInterface } from "./Discussion";


const MainDiscussion = ({conversationData, messagesData, userData, socket}: { conversationData: Conversation, messagesData: Messages[], userData: UserDataInterface, socket: Socket}) => {
  const [listOfMessages, setListOfMessages] = useState<MessageFormated[]>(
    messagesData.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  )

  const handleSendMessage = async (message: string) => {
    socket?.emit('message', { data: message})
    await axios.post("message", {
      text: message,
      owner: userData.id,
      conversation: conversationData.id
    })
  }

  // useEffect(() => {
  //   const newSocket = io(import.meta.env.VITE_NODE_ENV_DEV
  //     ? import.meta.env.VITE_URL_NEST_DEV
  //     : import.meta.env.VITE_URL_NEST_PROD)
  //     setSocket(newSocket)
  // }, [setSocket])

  const messageListener = (message: { data: string }) => {
    setListOfMessages([...listOfMessages, {
      id: messagesData.length,
      created_at: new Date(),
      text: message.data,
      owner: conversationData.renter,
    }])
  }

  useEffect(() => {
    socket?.on('message', messageListener);
    return () => { socket?.off('message', messageListener) }
  }, [messageListener])

  return (
    <div className={styles.main_container_info}>

      <div className={styles.messages}>
        <ListMessages listOfMessages={listOfMessages} userData={userData} />
      </div>

      <FormMessage handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default MainDiscussion;
