import styles from "./AuthForm.module.scss"
import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";
const AuthForm = () => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSwitchForm = (id: number) => {
    setValue(id)
  }

  return (
    <div className={styles.container}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        centered
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <div className={styles.forms}>
        {
          value === 0 ?

          <LoginForm handleSwitchForm={handleSwitchForm}/>

          :

          <RegisterForm handleSwitchForm={handleSwitchForm}/>

        }

      </div>
    </div>
  )
}

export default AuthForm