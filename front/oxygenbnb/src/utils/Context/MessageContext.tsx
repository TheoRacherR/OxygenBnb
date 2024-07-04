import { createContext, useEffect, useState } from "react";
import { Conversation } from "../../../../../back/oxygenbnb/src/tables/conversation/entities/conversation.entity";
import { Messages } from "../../../../../back/oxygenbnb/src/tables/messages/entities/messages.entity";

export const MessageContext = createContext(undefined)

export const MessageContextProvider = ({children}) => {
    const [discussionSelected, setDiscussionSelected] = useState<{conversation: Conversation, last_message: Messages} | null>( null );
    useEffect(() => {
      if(!discussionSelected && localStorage.getItem('discussionSelected')) 
        setDiscussionSelected(JSON.parse(localStorage.getItem('discussionSelected') | null))
    }, [])
    // useEffect(() => {
    //   if(!localStorage.getItem("discussionSelected")) localStorage.setItem("discussionSelected", '{}')
    //   else if(JSON.parse(localStorage.getItem("discussionSelected")) !== discussionSelected) {
    //     // localStorage.setItem("discussionSelected", JSON.stringify(discussionSelected))
    //     setDiscussionSelected(JSON.parse(localStorage.getItem("discussionSelected")))
    //   }
    // }, [discussionSelected])

    return (
      <MessageContext.Provider value={{discussionSelected, setDiscussionSelected}}>
        {children}
      </MessageContext.Provider>
    );
}