import { useState } from 'react';
import Input from '@mui/joy/Input';
import Key from "@mui/icons-material/Key";
import { Stack, Button } from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

const LoginForm = ({handleSwitchForm}) => {
  const [valuesLogin, setValuesLogin] = useState<{mail: string, password: string}>({mail: "", password: ""})
  const handleLogin = () => {
    console.log(valuesLogin);
  }

  return (
    <div>
      <div>
        <Stack
          spacing={0.5}
          sx={{
            marginTop: "25px",
            marginBottom: "25px"
          }}
        >
          <Input
            type="mail"
            placeholder="Type your mail"
            startDecorator={<EmailRoundedIcon/>}
            value={valuesLogin.mail}
            onChange={e => setValuesLogin(prev => ({...prev, mail: e.target.value}))}
          />
        </Stack>
        <Stack spacing={0.5} sx={{marginTop: "25px", marginBottom: "25px"}}>
          <Input type="password" placeholder="Type your password" startDecorator={<Key/>} value={valuesLogin.password}  onChange={e => setValuesLogin(prev => ({...prev, password: e.target.value}))}/>
        </Stack>
        <Button variant="contained" sx={{margin: "10px 0", width: "100%"}} onClick={handleLogin} disabled={valuesLogin.mail.length === 0 || valuesLogin.password.length === 0}>Log in</Button>
      </div>
      <div>Don't have an account ? <span style={{ color: "#ed6c0280", cursor: "pointer"}} onClick={() => handleSwitchForm(1)}>Click here</span></div>
    </div>
  )
}

export default LoginForm