import styles from "./Infos.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["admin_admin"]);

  return (
    <Accordion sx={{ backgroundColor: "#0A0E0F" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #32383e",
          borderRadius: "10px",
        }}
      >
        <PersonRoundedIcon />
        &nbsp;
        {t(
          "admin_admin:users.reservation.discussion_tsx.summary.discussions"
        )}{" "}
        {discussion_id}{" "}
        {t("admin_admin:users.reservation.discussion_tsx.summary.about_loc")}{" "}
        {location_id}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.list_container}>
          {discussionData.discussion
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((item, index) => (
              <div className={styles.item} key={index} style={{ fontSize: "small" }}>
                <span style={{ color: "grey" }}>
                  {item.date.toLocaleString()}
                </span>{" "}
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
      </AccordionDetails>
    </Accordion>
  );
};

export default Discussion;
