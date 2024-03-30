import React, { useEffect, useState } from "react";
import styles from "./FormMessage.module.scss";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Input from '@mui/joy/Input';

const FormMessage = ({ handleSendMessage }) => {
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
          placeholder="Type in here…"
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
              Send
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default FormMessage;
