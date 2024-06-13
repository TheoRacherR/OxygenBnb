import { useState } from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Button } from "@mui/material";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Key from "@mui/icons-material/Key";
import { useTranslation } from "react-i18next";
import axios from "axios";

const RegisterForm = ({ handleSwitchForm, closeForm }) => {
  const { t } = useTranslation(["site"]);
  const [valuesRegister, setValuesRegister] = useState<{
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    confirmPassword: string;
  }>({ firstname: "", lastname: "", mail: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<{
    passwordCooherence: boolean;
    emailAlreadyUsed: boolean;
  }>({ passwordCooherence: false, emailAlreadyUsed: false });

  const minLength: number = 12;

  const handleRegister = async () => {
    console.log(valuesRegister);
    setError({passwordCooherence: false, emailAlreadyUsed: false})
    try {
      await axios.post("http://localhost:3333" + "/auth/register/", {
        firstname: valuesRegister.firstname,
        lastname: valuesRegister.lastname,
        email: valuesRegister.mail,
        password: valuesRegister.password,
      })
      closeForm();
    }
    catch(e){
      if(e.response.status === 409) setError({passwordCooherence: false, emailAlreadyUsed: true})
    }
  };

  return (
    <div>
      <div>
        <Stack
          spacing={0.5}
          sx={{
            marginTop: "25px",
            marginBottom: "25px",
            display: "flex",
            flexDirection: "unset"
          }}
        >
          <Input
            type="text"
            sx={{width: "50%", margin: 0}}
            placeholder={t(
              "site:home.default.menu.auth.register_form_tsx.firstname"
            )}
            // startDecorator={<EmailRoundedIcon />}
            value={valuesRegister.firstname}
            onChange={(e) =>
              setValuesRegister((prev) => ({ ...prev, firstname: e.target.value }))
            }
          />
          <Input
            type="text"
            sx={{width: "50%", margin: "0 !important"}}
            placeholder={t(
              "site:home.default.menu.auth.register_form_tsx.lastname"
            )}
            // startDecorator={<EmailRoundedIcon />}
            value={valuesRegister.lastname}
            onChange={(e) =>
              setValuesRegister((prev) => ({ ...prev, lastname: e.target.value }))
            }
          />
        </Stack>
        <Stack
          spacing={0.5}
          sx={{
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          <Input
            type="mail"
            placeholder={t(
              "site:home.default.menu.auth.register_form_tsx.mail.placeholder"
            )}
            startDecorator={<EmailRoundedIcon />}
            value={valuesRegister.mail}
            onChange={(e) =>
              setValuesRegister((prev) => ({ ...prev, mail: e.target.value }))
            }
          />
          {error.emailAlreadyUsed ? (
            <div style={{ color: "red" }}>
              {t("site:home.default.menu.auth.register_form_tsx.mail.error")}
            </div>
          ) : (
            <></>
          )}
        </Stack>
        <Stack
          spacing={0.5}
          sx={{
            "--hue": Math.min(valuesRegister.password.length * 10, 120),
            marginTop: "15px",
          }}
        >
          <Input
            type="password"
            placeholder={t(
              "site:home.default.menu.auth.register_form_tsx.password.placeholder"
            )}
            startDecorator={<Key />}
            value={valuesRegister.password}
            onChange={(e) =>
              setValuesRegister((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <LinearProgress
            determinate
            size="sm"
            value={Math.min(
              (valuesRegister.password.length * 100) / minLength,
              100
            )}
            sx={{
              bgcolor: "background.level3",
              color: "hsl(var(--hue) 80% 40%)",
            }}
          />
          <Typography
            level="body-xs"
            sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
          >
            {valuesRegister.password.length < 3 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.very_weak"
              )}
            {valuesRegister.password.length >= 3 &&
              valuesRegister.password.length < 6 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.weak"
              )}
            {valuesRegister.password.length >= 6 &&
              valuesRegister.password.length < 10 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.strong"
              )}
            {valuesRegister.password.length >= 10 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.very_strong"
              )}
          </Typography>
        </Stack>
        <Stack
          spacing={0.5}
          sx={{
            "--hue": Math.min(valuesRegister.confirmPassword.length * 10, 120),
            marginTop: "15px",
          }}
        >
          <Input
            type="password"
            placeholder={t(
              "site:home.default.menu.auth.register_form_tsx.password.confirm_placeholder"
            )}
            startDecorator={<Key />}
            value={valuesRegister.confirmPassword}
            onChange={(e) =>
              setValuesRegister((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          <LinearProgress
            determinate
            size="sm"
            value={Math.min(
              (valuesRegister.confirmPassword.length * 100) / minLength,
              100
            )}
            sx={{
              bgcolor: "background.level3",
              color: "hsl(var(--hue) 80% 40%)",
            }}
          />
          <Typography
            level="body-xs"
            sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
          >
            {valuesRegister.password.length < 3 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.very_weak"
              )}
            {valuesRegister.password.length >= 3 &&
              valuesRegister.password.length < 6 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.weak"
              )}
            {valuesRegister.password.length >= 6 &&
              valuesRegister.password.length < 10 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.strong"
              )}
            {valuesRegister.password.length >= 10 &&
              t(
                "site:home.default.menu.auth.register_form_tsx.password.length.very_strong"
              )}
          </Typography>
          {error.passwordCooherence ? (
            <div style={{ color: "red" }}>
              {t(
                "site:home.default.menu.auth.register_form_tsx.password.error"
              )}
            </div>
          ) : (
            <></>
          )}
        </Stack>
        <Button
          variant="contained"
          sx={{ margin: "10px 0", width: "100%" }}
          onClick={handleRegister}
          disabled={
            valuesRegister.mail.length === 0 ||
            valuesRegister.password.length === 0 ||
            valuesRegister.confirmPassword.length === 0
              ? true
              : false
          }
        >
          {t("site:home.default.menu.auth.register_form_tsx.button_submit")}
        </Button>
      </div>
      <div>
        {t("site:home.default.menu.auth.register_form_tsx.have_account")} ?{" "}
        <span
          style={{ color: "#ed6c0280", cursor: "pointer" }}
          onClick={() => handleSwitchForm(0)}
        >
          {t("site:home.default.menu.auth.register_form_tsx.click")}
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
