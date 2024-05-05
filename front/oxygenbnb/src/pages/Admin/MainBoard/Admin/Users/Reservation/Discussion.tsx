import styles from "./ReservationPage.module.scss";
import Input from "@mui/joy/Input";

const discussionData = {
  location_owner_infos: {
    user_id: 1,
    first_name: "Leo",
    last_name: "DUPRES",
  },
  user_infos: {
    user_id: 3,
    first_name: "Marc",
    last_name: "CARL",
  },
  discussion: [
    {
      date: new Date("10-03-2022 10:00:00"),
      isSenderOwner: true,
      message: "Hello",
    },
    {
      date: new Date("10-03-2022 10:00:01"),
      isSenderOwner: true,
      message: "What do you want to do ?",
    },
    {
      date: new Date("10-03-2022 15:09:00"),
      isSenderOwner: true,
      message: "OK, thats fine by me",
    },
    {
      date: new Date("10-03-2022 11:02:34"),
      isSenderOwner: false,
      message: "I want to rent this locaiton",
    },
  ],
};

const Discussion = ({ location_id, discussion_id }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Discussion {discussion_id} about location {location_id}
      </div>
      <div className={styles.list_container}>
        {discussionData.discussion
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((item, index) => (
            <div className={styles.item} style={{fontSize: "small"}}>
              <span style={{color:"grey"}}>{item.date.toLocaleString()}</span>
              {" "}
              {item.isSenderOwner
                ? discussionData.location_owner_infos.first_name +
                  " " +
                  discussionData.location_owner_infos.last_name.substring(
                    0,
                    1
                  ) +
                  "."
                : discussionData.user_infos.first_name +
                  " " +
                  discussionData.user_infos.last_name.substring(0, 1) +
                  "."}
              : {item.message}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Discussion;
