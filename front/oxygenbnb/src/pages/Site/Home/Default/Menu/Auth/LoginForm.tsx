import { useState } from "react";
import Input from "@mui/joy/Input";
import Key from "@mui/icons-material/Key";
import { Stack, Button } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useTranslation } from "react-i18next";

const LoginForm = ({ handleSwitchForm }) => {
  const { t } = useTranslation(["site"]);
  const [valuesLogin, setValuesLogin] = useState<{
    mail: string;
    password: string;
  }>({ mail: "", password: "" });
  const handleLogin = () => {
    console.log(valuesLogin);
  };
  const [error, setError] = useState<{ credentials: boolean }>({
    credentials: false,
  });

  return (
    <div>
      <div>
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
              "site:home.default.menu.auth.login_form_tsx.mail.placeholder"
            )}
            startDecorator={<EmailRoundedIcon />}
            value={valuesLogin.mail}
            onChange={(e) =>
              setValuesLogin((prev) => ({ ...prev, mail: e.target.value }))
            }
          />
        </Stack>
        <Stack spacing={0.5} sx={{ marginTop: "25px", marginBottom: "25px" }}>
          <Input
            type="password"
            placeholder={t(
              "site:home.default.menu.auth.login_form_tsx.password.placeholder"
            )}
            startDecorator={<Key />}
            value={valuesLogin.password}
            onChange={(e) =>
              setValuesLogin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </Stack>
        <Button
          variant="contained"
          sx={{ margin: "10px 0", width: "100%" }}
          onClick={handleLogin}
          disabled={
            valuesLogin.mail.length === 0 || valuesLogin.password.length === 0
          }
        >
          {t("site:home.default.menu.auth.login_form_tsx.button_login")}
        </Button>
      </div>
      {error.credentials ? (
        <div style={{ color: "red" }}>
          {t("site:home.default.menu.auth.login_form_tsx.error")}
        </div>
      ) : (
        <></>
      )}
      <div>
        {t("site:home.default.menu.auth.login_form_tsx.have_account")} ?{" "}
        <span
          style={{ color: "#ed6c0280", cursor: "pointer" }}
          onClick={() => handleSwitchForm(1)}
        >
          {t("site:home.default.menu.auth.login_form_tsx.click")}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
