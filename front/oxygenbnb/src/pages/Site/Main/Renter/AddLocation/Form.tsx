import { useContext, useState } from "react";
import styles from "./Form.module.scss";
import Input from "@mui/joy/Input";
import { Button, ButtonGroup } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import Switch from "@mui/joy/Switch";

import { FormAddLocationContext } from "../../../../../utils/Context/FormAddLocationContext";

import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import SensorDoorRoundedIcon from "@mui/icons-material/SensorDoorRounded";
import AccessibilityNewRoundedIcon from "@mui/icons-material/AccessibilityNewRounded";

const Form = () => {
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
    if (event.target.value === " €") {
      setLocationInformations((prev) => ({ ...prev, price: parseInt(0) }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        price: parseInt(event.target.value),
      }));
    }
  };

  const handleChangeRoom = (event: React.SyntheticEvent | null) => {
    if (event.target.value === "") {
      setLocationInformations((prev) => ({ ...prev, nb_room: parseInt(0) }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        nb_room: parseInt(event.target.value),
      }));
    }
  };

  const handleChangeBed = (event: React.SyntheticEvent | null) => {
    if (event.target.value === "") {
      setLocationInformations((prev) => ({ ...prev, nb_bed: parseInt(0) }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        nb_bed: parseInt(event.target.value),
      }));
    }
  };

  const handleChangePerson = (event: React.SyntheticEvent | null) => {
    if (event.target.value === "") {
      setLocationInformations((prev) => ({ ...prev, nb_person: parseInt(0) }));
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
        <div className={styles.title}>Add a new location</div>
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Input
              variant="outlined"
              startDecorator={<label>Name</label>}
              onChange={(e) => setLocationInformations((prev) => ({
                ...prev,
                title: e.target.value,
              }))}
            />
          </div>

          <div className={styles.item}>
            <Textarea
              variant="outlined"
              startDecorator={<label>Description</label>}
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

          <div className={styles.item_flex}>
            <Input
              variant="outlined"
              value={locationInformations.nb_room}
              onChange={handleChangeRoom}
              startDecorator={<label>Room</label>}
            />
            <Input
              variant="outlined"
              value={locationInformations.nb_bed}
              onChange={handleChangeBed}
              startDecorator={<label>Bed</label>}
            />
            <Input
              variant="outlined"
              value={locationInformations.nb_person}
              onChange={handleChangePerson}
              startDecorator={<label>Person</label>}
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
                  {locationInformations.active ? "Activated" : "Desactivate"}
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
                Save
              </Button>
              <Button variant="solid" color="warning" onClick={() => setState("Preview")}>
                See preview
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
