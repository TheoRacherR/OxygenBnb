import styles from "./Requests.module.scss";
import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Navigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TabPanel from "@mui/joy/TabPanel";
import { useContext, useState } from "react";
import { MessageContext } from "../../../../../../../utils/Context/MessageContext";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useTranslation } from "react-i18next";


const data: {
  location_name: string;
  discussion: {
    id: number;
    info: {
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
    };
  };
}[] = [
  {
    location_name: "Test",
    discussion: {
      id: 3,
      info: {
        discussion_id: 3,
        user_id: 1,
        firstname: "Léa",
        lastname: "DUSSANT",
        online: false,
        last_message: {
          seen: false,
          message:
            " Maxime tempore consequatur nesciunt voluptas id ab ratione sequi. Fugit, fuga.",
          user_id: 1,
          date: new Date("2024-03-22 00:00:00"),
        },
        location_id: 9,
      },
    },
  },
  {
    location_name: "Test",
    discussion: {
      id: 4,
      info: {
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
    },
  },
];

const Requests = ({ value }) => {
  const { setDiscussionSelected } = useContext(MessageContext);
  const [redirectionGotoMessage, setRedirectionGotoMessage] = useState(false);
  const { t } = useTranslation(["admin_renter"]);

  const handleGoToMessages = (item) => {
    console.log(item);
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
            <Table sx={{ borderRadius: 20, color: "#fff" }}>
              <thead>
                <tr>
                  <th style={{ fontWeight: "bold", color: "#fff" }}>{t("admin_renter:renter.locations.location.requests_tsx.thead.name")}</th>
                  <th style={{ width: "60%", fontWeight: "bold", color: "#fff" }}>
                  {t("admin_renter:renter.locations.location.requests_tsx.thead.last_message")}
                  </th>
                  <th style={{ fontWeight: "bold", color: "#fff" }}>{t("admin_renter:renter.locations.location.requests_tsx.thead.user")}</th>
                  <th style={{ fontWeight: "bold", color: "#fff" }}></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.location_name}</td>
                    <td
                      style={{
                        fontWeight: item.discussion.info.last_message.seen
                          ? "bold"
                          : "normal",
                      }}
                    >
                      {item.discussion.info.last_message.user_id ===
                      item.discussion.info.user_id
                        ? ""
                        : `${t("admin_renter:renter.locations.location.requests_tsx.you")}: `}{" "}
                      {item.discussion.info.last_message.message}
                    </td>
                    <td>
                      {item.discussion.info.firstname}{" "}
                      {item.discussion.info.lastname.substring(0, 1)}.
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
                            handleGoToMessages(item.discussion.info)
                          }
                        >
                          <ArrowForwardIosRoundedIcon fontSize="small"/>
                        </Button>
                        <Button color="danger">
                          <DeleteForeverRoundedIcon fontSize="small"/>
                        </Button>
                        {/* </Link> */}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </div>
      </TabPanel>
    </>
  );
};

export default Requests;
