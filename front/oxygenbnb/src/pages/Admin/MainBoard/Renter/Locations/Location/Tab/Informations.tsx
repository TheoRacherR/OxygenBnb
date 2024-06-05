import { useState } from "react";
import TabPanel from "@mui/joy/TabPanel";
import styles from "./Informations.module.scss";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { red } from "@mui/material/colors";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useTranslation } from "react-i18next";

const enumCurrency = [
  "€ (euro)",
  "£ (pound)",
  "$ (us dollar)",
  "¥ (japan yen)",
  "Ұ (china yuan)",
  "₩ (south-korean won)",
];

const Informations = ({ value }) => {
  const { t } = useTranslation(["admin"]);
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
    <TabPanel value={value}>
      <div className={styles.container}>
        <div className={styles.title}>
          {t("admin:renter.locations.location.informations_tsx.title")}{" "}
          {locationInformations.active
            ? ""
            : `[${t(
                "admin:renter.locations.location.informations_tsx.not_active"
              )}]`}
        </div>
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations.id}
              startDecorator={
                <label>
                  {t(
                    "admin:renter.locations.location.informations_tsx.list.id"
                  )}
                </label>
              }
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
              startDecorator={
                <label>
                  {t(
                    "admin:renter.locations.location.informations_tsx.list.title"
                  )}
                </label>
              }
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
              startDecorator={
                <label>
                  {t(
                    "admin:renter.locations.location.informations_tsx.list.price"
                  )}
                </label>
              }
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
              startDecorator={
                <label>
                  {t(
                    "admin:renter.locations.location.informations_tsx.list.type"
                  )}
                </label>
              }
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
                {t(
                  "admin:renter.locations.location.informations_tsx.list.desactivate"
                )}
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
                {t(
                  "admin:renter.locations.location.informations_tsx.list.activate"
                )}
              </Button>
            )}
          </div>
          <div className={styles.item}>
            <Input
              variant="outlined"
              disabled
              startDecorator={
                <label>
                  {t(
                    "admin:renter.locations.location.informations_tsx.list.validated"
                  )}
                </label>
              }
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
              startDecorator={
                <label>
                  {t(
                    "admin:renter.locations.location.informations_tsx.list.owner"
                  )}
                </label>
              }
            />
          </div>

          <div
            className={styles.item}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Button sx={{ borderRadius: "6px" }} color="success">
              {t("admin:renter.locations.location.informations_tsx.list.save")}
            </Button>
          </div>
        </div>
      </div>
    </TabPanel>
  );
};

export default Informations;

/*
  id: number;
  c default_price: number; / default_currency: currency;
  c type: rentalType;
  c localisation_infos: string;
  isValid: boolean;
  owner: User;
  c active: boolean
*/
