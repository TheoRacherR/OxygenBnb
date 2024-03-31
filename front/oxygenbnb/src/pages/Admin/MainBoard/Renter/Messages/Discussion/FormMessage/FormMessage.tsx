import { useState } from "react";
import styles from "./FormMessage.module.scss";
import Button from "@mui/joy/Button";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Input from '@mui/joy/Input';
import { useTranslation } from "react-i18next";

const FormMessage = ({ handleSendMessage }) => {
  const { t }  = useTranslation(["admin_renter"])
  const [message, setMessage] = useState("");
  // const [buttonClicked, setButtonClicked] = useState(false)

  const handlePreSendMessage = () => {
    if (message != "") {
      handleSendMessage(message);
      setMessage("");
    }
  };


  return (
    <div className={styles.form_messages}>
      <div className={styles.textarea}>
        <Input 
          placeholder={t("admin_renter:renter.messages.discussion.form_message.form_message_tsx.placeholder")}
          variant="outlined"
          color="neutral"
          sx={{width: "100%", borderTopLeftRadius: '6px', borderTopRightRadius: '6px'}}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          endDecorator={
            <Button
              sx={{ borderRadius: "6px"}}
              endDecorator={<SendRoundedIcon />}
              size="sm"
              onClick={handlePreSendMessage}
            >
              {t("admin_renter:renter.messages.discussion.form_message.form_message_tsx.button_send")}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default FormMessage;
