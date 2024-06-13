import { useState } from "react";
import styles from "./Settings.module.scss";
import Input from "@mui/joy/Input";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { red } from "@mui/material/colors";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@mui/joy";

const enumCurrency = [
  "€ (euro)",
  "£ (pound)",
  "$ (us dollar)",
  "¥ (japan yen)",
  "Ұ (china yuan)",
  "₩ (south-korean won)",
];

const lang = [
  { name: "🇬🇧 English", param: "en" },
  { name: "🇫🇷 Français", param: "fr" },
];

// TODO : set settings

const Settings = () => {
  const { t, i18n } = useTranslation(["admin"]);
  const [locationInformations, setLocationInformations] = useState({
    id: 1,
    title: "",
    price: 300,
    default_currency: enumCurrency[0],
    type: "Hostel",
    isValid: true,
    owner: "Théo RACHER RAULIN",
    active: true,
  });

  const onClickLanguageChange = (item) => {
    if (item.param) {
      const language = item.param;
      i18n.changeLanguage(language); //change the language
      localStorage.setItem("lng", language);
    }
  };

  const handleChangeCurrency = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setLocationInformations((prev) => ({
      ...prev,
      default_currency: newValue,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{t("admin:renter.settings.title")}</div>
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations.id}
              startDecorator={<label>{t("admin:renter.settings.title")}</label>}
              disabled
            />
          </div>
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations.title}
              onChange={(e) =>
                setLocationInformations((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              startDecorator={<label>Title</label>}
            />
          </div>
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={
                locationInformations.price +
                " " +
                locationInformations.default_currency.substring(0, 1)
              }
              onChange={(e) =>
                setLocationInformations((prev) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }))
              }
              startDecorator={<label>Price per night</label>}
              endDecorator={
                <Select
                  value={locationInformations.default_currency}
                  onChange={handleChangeCurrency}
                >
                  {enumCurrency.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              }
            />
          </div>
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations.type}
              onChange={(e) =>
                setLocationInformations((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              startDecorator={<label>Type</label>}
            />
          </div>
          <div className={styles.item}>
            {locationInformations.active ? (
              <Button
                sx={{ borderRadius: "6px" }}
                color="danger"
                onClick={() =>
                  setLocationInformations((prev) => ({
                    ...prev,
                    active: false,
                  }))
                }
              >
                Desactivate
              </Button>
            ) : (
              <Button
                sx={{ borderRadius: "6px" }}
                color="success"
                onClick={() =>
                  setLocationInformations((prev) => ({
                    ...prev,
                    active: true,
                  }))
                }
              >
                Activate
              </Button>
            )}
          </div>
          <div className={styles.item}>
            <Input
              variant="outlined"
              disabled
              startDecorator={<label>Validated</label>}
              endDecorator={
                locationInformations.isValid ? (
                  <CheckCircleOutlineRoundedIcon color="success" />
                ) : (
                  <HighlightOffRoundedIcon sx={{ color: red[500] }} />
                )
              }
            />
          </div>

          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations.owner}
              disabled
              onChange={(e) =>
                setLocationInformations((prev) => ({
                  ...prev,
                  owner: e.target.value,
                }))
              }
              startDecorator={<label>Owner</label>}
            />
          </div>

          <div className={styles.item}>
            {/* <Select
              // value={lang.filter((item) => item.param === localStorage.getItem("lng"))[0].name}
              value={lang.filter((item) => item.param === lng)[0].name}
              onChange={onClickLanguageChange}
            >
              {lang.map((item, index) => (
                <Option key={index} value={item.param}>
                  {item.name}
                </Option>
              ))}
            </Select> */}
            <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
              {lang.map((item, index) => (
                <Button
                  color="neutral"
                  variant={
                    localStorage.getItem("lng") === item.param
                      ? "soft"
                      : "solid"
                  }
                  key={index}
                  onClick={() => onClickLanguageChange(item)}
                >
                  {item.name}
                </Button>
              ))}
            </ButtonGroup>
          </div>

          <div
            className={styles.item}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Button sx={{ borderRadius: "6px" }} color="success">
              {t("admin:renter.settings.save")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
