import styles from "./Requests.module.scss";
import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Navigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TabPanel from "@mui/joy/TabPanel";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "@utils/Context/MessageContext";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useTranslation } from "react-i18next";
import { Messages } from "../../../../../../../../../../back/oxygenbnb/src/tables/messages/entities/messages.entity";
import { Conversation } from "../../../../../../../../../../back/oxygenbnb/src/tables/conversation/entities/conversation.entity";
import axios from "axios";
import { getUserInfos } from "@utils/utils";

// const data: {
//   location_name: string;
//   discussion: {
//     id: number;
//     info: {
//       user_id: number;
//       firstname: string;
//       lastname: string;
//       online: boolean;
//       last_message: {
//         seen: boolean;
//         message: string;
//         user_id: number;
//         date: Date;
//       };
//       location_id: number;
//     };
//   };
// }[] = [
//   {
//     location_name: "Test",
//     discussion: {
//       id: 3,
//       info: {
//         user_id: 1,
//         firstname: "Léa",
//         lastname: "DUSSANT",
//         online: false,
//         last_message: {
//           seen: false,
//           message:
//             " Maxime tempore consequatur nesciunt voluptas id ab ratione sequi. Fugit, fuga.",
//           user_id: 1,
//           date: new Date("2024-03-22 00:00:00"),
//         },
//         location_id: 9,
//       },
//     },
//   },
//   {
//     location_name: "Test",
//     discussion: {
//       id: 4,
//       info: {
//         user_id: 9,
//         firstname: "Emmanuel",
//         lastname: "FLOP",
//         online: true,
//         last_message: {
//           seen: true,
//           message: "Salut",
//           user_id: 5,
//           date: new Date("2024-03-25 20:00:00"),
//         },
//         location_id: 2,
//       },
//     },
//   },
// ];

const Requests = ({ value }) => {
  const [redirectionGotoMessage, setRedirectionGotoMessage] = useState(false);
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



  const handleGoToMessages = (item) => {
    setDiscussionSelected(item);
    setRedirectionGotoMessage(true);
    return <Navigate to={"/admin/renter/messages"} />;
  };

  return (
    <>
      {redirectionGotoMessage ? (
        <Navigate to={"/admin/renter/messages"} />
      ) : (
        <></>
      )}
      <TabPanel value={value} sx={{ height: "unset" }}>
        <div className={styles.main_list}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "10px",
              padding: "10px",
              maxWidth: "100%",
              overflow: "auto",
              maxHeight: "100%",
              backgroundColor: "#0A0E0F",
              borderColor: "grey",
            }}
          >
            {conversationData.length === 0 ? (
              <div style={{ color: "white" }}>
                {t("admin:renter.locations.location.requests_tsx.no_request")}
              </div>
            ) : (
              <Table sx={{ borderRadius: 20, color: "#fff" }}>
                <thead>
                  <tr>
                    <th style={{ fontWeight: "bold", color: "#fff" }}>
                      {t(
                        "admin:renter.locations.location.requests_tsx.thead.id"
                      )}
                    </th>
                    <th
                      style={{
                        width: "60%",
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      {t(
                        "admin:renter.locations.location.requests_tsx.thead.last_message"
                      )}
                    </th>
                    <th style={{ fontWeight: "bold", color: "#fff" }}>
                      {t(
                        "admin:renter.locations.location.requests_tsx.thead.user"
                      )}
                    </th>
                    <th style={{ fontWeight: "bold", color: "#fff" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {conversationData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.conversation.rental.id}</td>
                      <td
                        // style={{
                        //   fontWeight: item.discussion.info.last_message.seen
                        //     ? "bold"
                        //     : "normal",
                        // }}
                      >
                        {item.last_message.owner.id === userInfos.id
                          ? ""
                          : `${t(
                              "admin:renter.locations.location.requests_tsx.you"
                            )}: `}{" "}
                        {item.last_message.text}
                      </td>
                      <td>
                        {item.conversation.client.firstname}{" "}
                        {item.conversation.client.lastname.substring(0, 1)}.
                      </td>
                      <td>
                        <ButtonGroup
                          sx={{ borderRadius: 6 }}
                          variant="solid"
                          color="warning"
                        >
                          {/* <Link to="/admin/renter/messages"> */}
                          <Button
                            color="primary"
                            onClick={() =>
                              handleGoToMessages(item)
                            }
                          >
                            <ArrowForwardIosRoundedIcon fontSize="small" />
                          </Button>
                          <Button color="danger">
                            <DeleteForeverRoundedIcon fontSize="small" />
                          </Button>
                          {/* </Link> */}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Sheet>
        </div>
      </TabPanel>
    </>
  );
};

export default Requests;
