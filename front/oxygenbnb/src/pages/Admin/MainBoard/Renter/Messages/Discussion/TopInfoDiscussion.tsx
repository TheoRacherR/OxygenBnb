import styles from "./TopInfoDiscussion.module.scss";
import { Avatar, Button } from "@mui/joy";
import StatusComponent from "../StatusComponent";
import { useContext, useEffect } from "react";
import { MessageContext } from "@utils/Context/MessageContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TopInfoDiscussion = ({ conversationData }) => {
  const { t } = useTranslation(["admin"]);

  return (
    <div className={styles.top_container_info}>
      <div className={styles.left_info}>
        <Avatar sx={{ margin: "auto" }}>
          {conversationData.client.firstname?.substring(0, 1).toUpperCase() || "J"}
        </Avatar>
        <div className={styles.name}>
          {conversationData.client.firstname || "John"}{" "}
          {conversationData.client.lastname?.substring(0, 1).toUpperCase() || "Doe"}.
        </div>
        <div className={styles.status}>
          {true ? (
            <>
              <StatusComponent color={"green"} />
              <span>
                {t(
                  "admin:renter.messages.discussion.top_info_discussion_tsx.online"
                )}
              </span>
            </>
          ) : (
            <>
              <StatusComponent color={"grey"} />
              <span>
                {t(
                  "admin:renter.messages.discussion.top_info_discussion_tsx.offline"
                )}
              </span>
            </>
          )}
        </div>
      </div>
      <div className={styles.right_info}>
        <Link to={`/admin/renter/location/${conversationData.rental.id}`}>
          <Button
            variant="outlined"
            color="neutral"
            sx={{ borderRadius: "5px", color: "grey" }}
          >
            {t(
              "admin:renter.messages.discussion.top_info_discussion_tsx.location_information"
            )}
            {conversationData.rental.id || 0}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopInfoDiscussion;
