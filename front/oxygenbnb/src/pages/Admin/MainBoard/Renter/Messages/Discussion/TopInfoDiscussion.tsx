import styles from "./TopInfoDiscussion.module.scss";
import { Avatar, Button } from "@mui/joy";
import StatusComponent from "../StatusComponent";
import { useContext } from "react";
import { MessageContext } from "../../../../../../utils/Context/MessageContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TopInfoDiscussion = () => {
  const { t } = useTranslation(["admin"]);
  const { discussionSelected } = useContext(MessageContext);
  return (
    <div className={styles.top_container_info}>
      <div className={styles.left_info}>
        <Avatar sx={{ margin: "auto" }}>
          {discussionSelected.firstname?.substring(0, 1).toUpperCase() || "J"}
        </Avatar>
        <div className={styles.name}>
          {discussionSelected.firstname || "John"}{" "}
          {discussionSelected.lastname?.substring(0, 1).toUpperCase() || "Doe"}.
        </div>
        <div className={styles.status}>
          {discussionSelected.online ? (
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
        <Link to={`/admin/renter/location/${discussionSelected.location_id}`}>
          <Button
            variant="outlined"
            color="neutral"
            sx={{ borderRadius: "5px", color: "grey" }}
          >
            {t(
              "admin:renter.messages.discussion.top_info_discussion_tsx.location_information"
            )}
            {discussionSelected.location_id || 0}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopInfoDiscussion;
