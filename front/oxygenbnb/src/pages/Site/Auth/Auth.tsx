// import { useEffect } from "react";
import { verifyIfLogged } from "@utils/utils";
import AuthForm from "../Home/Default/Menu/AuthForm";
import styles from "./Auth.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const checkIfLogged = async () => {
    const logged = await verifyIfLogged();
    if (logged) {
      console.log("Logged, redirect");
      return navigate("/");
    }
  };

  useEffect(() => {
    checkIfLogged();
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
