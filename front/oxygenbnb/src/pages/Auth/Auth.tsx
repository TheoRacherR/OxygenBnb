import AuthForm from "../Site/Home/Default/Menu/AuthForm";
import styles from "./Auth.module.scss"

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AuthForm/>
      </div>
    </div>
  )
}

export default Auth