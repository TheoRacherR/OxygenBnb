import styles from "./AuthForm.module.scss"
import { Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";
import { verifyIfLogged } from "../../../../../utils/utils";
import { useNavigate } from "react-router-dom";

const AuthForm = ({closeForm}) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSwitchForm = (id: number) => {
    setValue(id)
  }

  const navigate = useNavigate();
  useEffect(() => {
    if(verifyIfLogged()) return navigate('/');
  })


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

          <LoginForm handleSwitchForm={handleSwitchForm} closeForm={closeForm}/>

          :

          <RegisterForm handleSwitchForm={handleSwitchForm} closeForm={closeForm}/>

        }

      </div>
    </div>
  )
}

export default AuthForm