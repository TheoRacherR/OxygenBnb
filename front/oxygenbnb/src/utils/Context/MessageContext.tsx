import { createContext, useEffect, useState } from "react";

export const MessageContext = createContext(undefined)

export const MessageContextProvider = ({children}) => {
    const [discussionSelected, setDiscussionSelected] = useState<{id: number | null}>(
      JSON.parse(localStorage.getItem("discussionSelected")) || null
    );
    
    useEffect(() => {
      if(JSON.parse(localStorage.getItem("discussionSelected")) !== discussionSelected) {
        localStorage.setItem("discussionSelected", JSON.stringify(discussionSelected))
      }
    }, [discussionSelected])

    return (
      <MessageContext.Provider value={{discussionSelected, setDiscussionSelected}}>
        {children}
      </MessageContext.Provider>
    );
}