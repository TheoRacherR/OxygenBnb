import React from "react";
import styles from "./Styles.module.scss";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation(["site"]);
  return (
    <div className={styles.container_login}>
      <h2>{t("site:main.room.reserve.blocks.login_tsx.title")}</h2>
      <Link to="/o/login">
        <Button variant="solid" color="warning" sx={{ width: "100%" }}>
          {t("site:main.room.reserve.blocks.login_tsx.button")}
        </Button>
      </Link>
      <div></div>
    </div>
  );
};

export default Login;
