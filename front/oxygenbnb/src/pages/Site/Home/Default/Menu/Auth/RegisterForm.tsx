import { useState } from "react";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { Button } from "@mui/material";
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Key from '@mui/icons-material/Key';


const RegisterForm = ({handleSwitchForm}) => {
  const [valuesRegister, setValuesRegister] = useState<{mail: string, password: string, confirmPassword: string}>({mail: "", password: "", confirmPassword: ""})
  const minLength: number = 12;
  const handleRegister = () => {
    console.log(valuesRegister);
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
            value={valuesRegister.mail}
            onChange={e => setValuesRegister(prev => ({...prev, mail: e.target.value}))}
          />
        </Stack>
        <Stack
          spacing={0.5}
          sx={{
            '--hue': Math.min(valuesRegister.password.length * 10, 120),
            marginTop: "15px"
          }}
        >
          <Input
            type="password"
            placeholder="Type a password"
            startDecorator={<Key />}
            value={valuesRegister.password}
            onChange={e => setValuesRegister(prev => ({...prev, password: e.target.value}))}
          />
          <LinearProgress
            determinate
            size="sm"
            value={Math.min((valuesRegister.password.length * 100) / minLength, 100)}
            sx={{
              bgcolor: 'background.level3',
              color: 'hsl(var(--hue) 80% 40%)',
            }}
          />
          <Typography
            level="body-xs"
            sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
          >
            {valuesRegister.password.length < 3 && 'Very weak'}
            {valuesRegister.password.length >= 3 && valuesRegister.password.length < 6 && 'Weak'}
            {valuesRegister.password.length >= 6 && valuesRegister.password.length < 10 && 'Strong'}
            {valuesRegister.password.length >= 10 && 'Very strong'}
          </Typography>
        </Stack>
        <Stack
          spacing={0.5}
          sx={{
            '--hue': Math.min(valuesRegister.confirmPassword.length * 10, 120),
            marginTop: "15px"
          }}
        >
          <Input
            type="password"
            placeholder="Confirm your password"
            startDecorator={<Key />}
            value={valuesRegister.confirmPassword}
            onChange={(e) => setValuesRegister(prev => ({...prev, confirmPassword: e.target.value}))}
          />
          <LinearProgress
            determinate
            size="sm"
            value={Math.min((valuesRegister.confirmPassword.length * 100) / minLength, 100)}
            sx={{
              bgcolor: 'background.level3',
              color: 'hsl(var(--hue) 80% 40%)',
            }}
          />
          <Typography
            level="body-xs"
            sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
          >
            {valuesRegister.confirmPassword.length < 3 && 'Very weak'}
            {valuesRegister.confirmPassword.length >= 3 && valuesRegister.confirmPassword.length < 6 && 'Weak'}
            {valuesRegister.confirmPassword.length >= 6 && valuesRegister.confirmPassword.length < 10 && 'Strong'}
            {valuesRegister.confirmPassword.length >= 10 && 'Very strong'}
          </Typography>
        </Stack>
        <Button variant="contained" sx={{margin: "10px 0", width: "100%"}} onClick={handleRegister} disabled={valuesRegister.mail.length === 0 || valuesRegister.password.length === 0 || valuesRegister.confirmPassword.length === 0 ? true : false}>Submit</Button>
      </div>
      <div>Already have an account ? <span style={{ color: "#C96217", cursor: "pointer"}} onClick={() => handleSwitchForm(0)}>Click here</span></div>
    </div>
  )
}

export default RegisterForm