import { useContext, useState } from "react";
import styles from "./Form.module.scss";
import Input from "@mui/joy/Input";
import { Button, ButtonGroup } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import Switch from "@mui/joy/Switch";

import { FormAddLocationContext } from "../../../../../utils/Context/FormAddLocationContext";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { t } = useTranslation(["site_main"]);
  const {
    setState,
    locationInformations,
    setLocationInformations,
    enumCurrency,
    locationType
  } = useContext(FormAddLocationContext);

  const handleChangeLocType = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setLocationInformations((prev) => ({
      ...prev,
      type: newValue,
    }));
  };

  const handleChangePrice = (event: React.SyntheticEvent | null) => {
    if (event.target.value === ` ${locationInformations.default_currency.substring(0,1)}`) {
      setLocationInformations((prev) => ({ ...prev, price: 0 }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        price: parseInt(event.target.value),
      }));
    }
  };

  const handleChangeRoom = (event: React.SyntheticEvent | null) => {
    if (event.target.value === "") {
      setLocationInformations((prev) => ({ ...prev, nb_room: 0 }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        nb_room: parseInt(event.target.value),
      }));
    }
  };

  const handleChangeBed = (event: React.SyntheticEvent | null) => {
    if (event.target.value === "") {
      setLocationInformations((prev) => ({ ...prev, nb_bed: 0 }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        nb_bed: parseInt(event.target.value),
      }));
    }
  };

  const handleChangePerson = (event: React.SyntheticEvent | null) => {
    if (event.target.value === "") {
      setLocationInformations((prev) => ({ ...prev, nb_person: 0 }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        nb_person: parseInt(event.target.value),
      }));
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
        <div className={styles.title}>{t('site_main:main.renter.add_location.form_tsx.title')}</div>
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Input
              variant="outlined"
              startDecorator={<label>{t('site_main:main.renter.add_location.form_tsx.name')}</label>}
              onChange={(e) => setLocationInformations((prev) => ({
                ...prev,
                title: e.target.value,
              }))}
            />
          </div>

          <div className={styles.item}>
            <Textarea
              variant="outlined"
              startDecorator={<label>{t('site_main:main.renter.add_location.form_tsx.description')}</label>}
              onChange={(e) => setLocationInformations((prev) => ({
                ...prev,
                description: e.target.value,
              }))}
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
              onChange={handleChangePrice}
              startDecorator={<label>{t('site_main:main.renter.add_location.form_tsx.price')}</label>}
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

          <div className={styles.item_flex}>
            <Input
              variant="outlined"
              value={locationInformations.nb_room}
              onChange={handleChangeRoom}
              startDecorator={<label>{t('site_main:main.renter.add_location.form_tsx.room')}</label>}
            />
            <Input
              variant="outlined"
              value={locationInformations.nb_bed}
              onChange={handleChangeBed}
              startDecorator={<label>{t('site_main:main.renter.add_location.form_tsx.bed')}</label>}
            />
            <Input
              variant="outlined"
              value={locationInformations.nb_person}
              onChange={handleChangePerson}
              startDecorator={<label>{t('site_main:main.renter.add_location.form_tsx.person')}</label>}
            />
          </div>

          <div className={styles.item}>
            <Select
              value={locationInformations.type}
              onChange={handleChangeLocType}
            >
              {locationType.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.item}>
            <Input
              variant="outlined"
              startDecorator={
                <label>
                  {locationInformations.active ? t('site_main:main.renter.add_location.form_tsx.activated') : t('site_main:main.renter.add_location.form_tsx.desactivated')}
                </label>
              }
              endDecorator={
                <Switch
                  checked={locationInformations.active}
                  onChange={(event) =>
                    setLocationInformations((prev) => ({
                      ...prev,
                      active: event.target.checked,
                    }))
                  }
                />
              }
            />
          </div>

          <div
            className={styles.item}
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <ButtonGroup>
              <Button variant="solid" color="success">
                {t('site_main:main.renter.add_location.form_tsx.save')}
              </Button>
              <Button variant="solid" color="warning" onClick={() => setState("Preview")}>
                {t('site_main:main.renter.add_location.form_tsx.preview')}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
