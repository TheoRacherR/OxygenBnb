import styles from "./MainDiscussion.module.scss";
import ListMessages from "./ListMessages/ListMessages";
import { useState } from "react";
import FormMessage from "./FormMessage/FormMessage";

const data_messages = [
  {
    id: 0,
    date: new Date("2024-03-30 10:00:00"),
    message: "Salut ça va ?",
    ownerOfThisMessage: true,
  },
  {
    id: 1,
    date: new Date("2024-03-30 10:01:00"),
    message: "ex dolores aut ad, nam quidem porro",
    ownerOfThisMessage: false,
  },
  {
    id: 2,
    date: new Date("2024-03-30 10:01:04"),
    message: "itaque praesentium delectus",
    ownerOfThisMessage: true,
  },
  {
    id: 3,
    date: new Date("2024-01-01 10:00:04"),
    message: "eum soluta in iure architecto ea nemo, vel",
    ownerOfThisMessage: true,
  },
  {
    id: 4,
    date: new Date("2024-03-30 10:00:01"),
    message: "consectetur temporibus laudantium",
    ownerOfThisMessage: false,
  },
  {
    id: 5,
    date: new Date("2024-03-30 09:00:00"),
    message: "asperiores quos",
    ownerOfThisMessage: false,
  },
  {
    id: 6,
    date: new Date("2020-03-30 02:20:34"),
    message: "quibusdam dolores qui ipsam nostrum ab facilis",
    ownerOfThisMessage: true,
  },
  {
    id: 7,
    date: new Date("2024-03-29 09:05:00"),
    message: "",
    ownerOfThisMessage: true,
  },
  {
    id: 8,
    date: new Date("2024-03-29 10:00:09"),
    message: "vitae temporibus perferendis",
    ownerOfThisMessage: false,
  },
  {
    id: 9,
    date: new Date("2024-03-30 10:00:08"),
    message: "possimus esse qui quisquam.",
    ownerOfThisMessage: true,
  },
  {
    id: 10,
    date: new Date("2024-03-30 11:11:11"),
    message: `cupiditate doloremque natus eos iusto inventore non architecto sapiente 
  ipsum rem voluptatem esse ea`,
    ownerOfThisMessage: true,
  },
  {
    id: 11,
    date: new Date("2024-03-30 10:03:12"),
    message: "voluptate",
    ownerOfThisMessage: false,
  },
  {
    id: 12,
    date: new Date("2024-03-30 18:09:10"),
    message:
      "ipsum tempore. Illo unde, autem officiis tempore, cumque reprehenderit doloremque ut necessitatibus consequuntur sapiente iusto, voluptatibus ab explicabo nisi pariatur consequatur? Temporibus voluptas culpa veniam possimus eaque ad dolor voluptatum ducimus dignissimos.",
    ownerOfThisMessage: true,
  },
  {
    id: 13,
    date: new Date("2024-03-30 18:09:10"),
    message: "tenetur cupiditate veniam dicta",
    ownerOfThisMessage: false,
  },
];

const MainDiscussion = () => {
  const [listOfMessages, setListOfMessages] = useState<{
    id: number,
    date: Date,
    message: string,
    ownerOfThisMessage: boolean,
  }[]>(data_messages.filter((m) => m.message != "").sort((a, b) => a.date.getTime() - b.date.getTime()))


  const handleSendMessage = (message: string) => {
    setListOfMessages(prev => (
      [
        ...prev,
        {
          id: listOfMessages.length,
          date: new Date(),
          message: message,
          ownerOfThisMessage: true,
        }
      ]
    ))
    
  }

  return (
    <div className={styles.main_container_info}>

      <div className={styles.messages}>
        <ListMessages listOfMessages={listOfMessages}/>
      </div>

      <FormMessage handleSendMessage={handleSendMessage}/>
    </div>
  );
};

export default MainDiscussion;
