import { useNavigate } from "react-router-dom";
import AuthForm from "../Site/Home/Default/Menu/AuthForm";
import styles from "./Auth.module.scss"

const Auth = () => {
  const navigate = useNavigate();
  const closeForm = () => {
    return navigate("")
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AuthForm closeForm={closeForm}/>
      </div>
    </div>
  )
}

export default Auth