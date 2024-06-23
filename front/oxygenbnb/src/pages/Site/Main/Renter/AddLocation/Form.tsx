import { useContext, useEffect, useState } from "react";
import styles from "./Form.module.scss";
import Input from "@mui/joy/Input";
import { Button, ButtonGroup } from "@mui/joy";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import Switch from "@mui/joy/Switch";
import { FormAddLocationContext } from "@utils/Context/FormAddLocationContext";
import { useTranslation } from "react-i18next";
import SearchLocalisation from "./SearchLocalisation";
import axios from "axios";
import { getUserInfos } from "@utils/utils";
import { useNavigate } from "react-router-dom";

const emptyErros = {
  global: false,
  titleEmpty: false,
  descriptionEmpty: false,
  priceEmpty: false,
  priceNotANumber: false,
  addressEmpty: false,
  nbRoomEmpty: false,
  nbPersonEmpty: false,
  nbBedEmpty: false,
};

const Form = () => {
  const { t } = useTranslation(["site"]);
  const navigate = useNavigate();
  const [usrInfos, setUsrInfos] = useState<{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  }>();
  const [errors, setErros] = useState<{
    global: boolean;
    titleEmpty: boolean;
    descriptionEmpty: boolean;
    priceEmpty: boolean;
    priceNotANumber: boolean;
    addressEmpty: boolean;
    nbRoomEmpty: boolean;
    nbPersonEmpty: boolean;
    nbBedEmpty: boolean;
  }>(emptyErros);
  const {
    setState,
    locationInformations,
    setLocationInformations,
    enumCurrency,
    locationType,
    resetData,
  } = useContext(FormAddLocationContext);

  useEffect(() => {
    getUsrInfos();
  }, []);

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
    const val = event.target.value;
    if (
      !val
        .split("")
        .map((i) => parseInt(i))
        .includes(NaN)
    ) {
      setLocationInformations((prev) => ({
        ...prev,
        price: parseInt(val),
      }));
    } else {
      setLocationInformations((prev) => ({
        ...prev,
        price: val,
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

  const handleCreateRental = async () => {
    setErros(emptyErros);
    if (locationInformations.title === "") {
      setErros((prev) => ({ ...prev, titleEmpty: true, global: true }));
    }
    if (locationInformations.description === "") {
      setErros((prev) => ({ ...prev, descriptionEmpty: true, global: true }));
    }
    if (locationInformations.price === "" || locationInformations.price < 1) {
      setErros((prev) => ({ ...prev, priceEmpty: true, global: true }));
    }
    if (locationInformations.localisation_infos === "") {
      setErros((prev) => ({ ...prev, addressEmpty: true, global: true }));
    }
    if (locationInformations.nb_room < 1) {
      setErros((prev) => ({ ...prev, nbRoomEmpty: true, global: true }));
    }
    if (locationInformations.nb_person < 1) {
      setErros((prev) => ({ ...prev, nbPersonEmpty: true, global: true }));
    }
    if (locationInformations.nb_bed < 1) {
      setErros((prev) => ({ ...prev, nbBedEmpty: true, global: true }));
    }
    if (!errors.global) {
      if (usrInfos) {
        try {
          await axios.post("/rental", {
            default_price: locationInformations.price,
            default_currency: locationInformations.default_currency,
            type: locationInformations.type,
            description: locationInformations.description,
            localisation_infos: locationInformations.localisation_infos,
            owner: usrInfos.id,
            active: locationInformations.active,
            title: locationInformations.title,
            nb_max_person: locationInformations.nb_person,
            nb_max_bed: locationInformations.nb_bed,
            nb_max_room: locationInformations.nb_room,
          });
          console.log("rental created: ");
          resetData();
          // return navigate("/o/user");
        } catch (e) {
          console.log(e);
          return navigate("");
        }
      }
    }
  };

  const getUsrInfos = async () => {
    setUsrInfos(await getUserInfos());
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {t("site:main.renter.add_location.form_tsx.title")}
        </div>
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Input
              variant="outlined"
              error={errors.titleEmpty}
              value={locationInformations.title}
              startDecorator={
                <label>
                  {t("site:main.renter.add_location.form_tsx.name")}
                </label>
              }
              onChange={(e) =>
                setLocationInformations((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles.item}>
            <Textarea
              variant="outlined"
              error={errors.descriptionEmpty}
              value={locationInformations.description}
              startDecorator={
                <label>
                  {t("site:main.renter.add_location.form_tsx.description")}
                </label>
              }
              onChange={(e) =>
                setLocationInformations((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles.item}>
            <Input
              variant="outlined"
              error={errors.priceEmpty || errors.priceNotANumber}
              type="number"
              value={locationInformations.price}
              onChange={handleChangePrice}
              startDecorator={
                <label>
                  {t("site:main.renter.add_location.form_tsx.price")}
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
            <SearchLocalisation error={errors.addressEmpty} />
          </div>

          <div className={styles.item_flex}>
            <Input
              variant="outlined"
              error={errors.nbRoomEmpty}
              value={locationInformations.nb_room}
              onChange={handleChangeRoom}
              startDecorator={
                <label>
                  {t("site:main.renter.add_location.form_tsx.room")}
                </label>
              }
            />
            <Input
              variant="outlined"
              error={errors.nbBedEmpty}
              value={locationInformations.nb_bed}
              onChange={handleChangeBed}
              startDecorator={
                <label>{t("site:main.renter.add_location.form_tsx.bed")}</label>
              }
            />
            <Input
              variant="outlined"
              error={errors.nbPersonEmpty}
              value={locationInformations.nb_person}
              onChange={handleChangePerson}
              startDecorator={
                <label>
                  {t("site:main.renter.add_location.form_tsx.person")}
                </label>
              }
            />
          </div>

          <div className={styles.item}>
            <Select
              value={locationInformations.type}
              onChange={handleChangeLocType}
            >
              {locationType.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations.active}
              startDecorator={
                <label>
                  {locationInformations.active
                    ? t("site:main.renter.add_location.form_tsx.activated")
                    : t("site:main.renter.add_location.form_tsx.desactivated")}
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
              <Button
                variant="solid"
                color="success"
                onClick={handleCreateRental}
              >
                {t("site:main.renter.add_location.form_tsx.save")}
              </Button>
              <Button
                variant="solid"
                color="warning"
                onClick={() => setState("Preview")}
              >
                {t("site:main.renter.add_location.form_tsx.preview")}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
