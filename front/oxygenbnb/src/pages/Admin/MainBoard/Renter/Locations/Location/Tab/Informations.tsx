import { useEffect, useState } from "react";
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
import axios from "axios";
import { getUserInfos } from "@utils/utils";
import { useParams } from "react-router-dom";
import { Rental } from "../../../../../../../../../../back/oxygenbnb/src/tables/rental/entities/rental.entity";
import SearchLocation from "./SearchLocation";

const enumCurrency = [
  "€ (euro)",
  "£ (pound)",
  "$ (us dollar)",
  "¥ (japan yen)",
  "Ұ (china yuan)",
  "₩ (south-korean won)",
];

const enumRentalType = [
  'House',
  'Pool',
  'Exotic',
]

const Informations = ({ value }) => {
  const { t } = useTranslation(["admin"]);
  const { id } = useParams();
  const [locationInformations, setLocationInformations] = useState<Rental>();
  const [userInfos, setUserInfos] = useState<{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  }>();

  const fetchLocation = async () => {
    const locationListRaw: { data: Rental } = await axios.get(
      `/rental/${id}`
    );
    console.log(locationListRaw.data);
    setLocationInformations(locationListRaw.data);
  };

  const usr = async () => {
    const infos = await getUserInfos();
    setUserInfos(infos);
  };

  useEffect(() => {
    if (userInfos) fetchLocation();
    else usr();
  }, [userInfos]);

  const handleChangeCurrency = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setLocationInformations((prev) => ({
      ...prev,
      default_currency: newValue,
    }));
  };
  const handleChangeRentalType = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setLocationInformations((prev) => ({
      ...prev,
      type: newValue,
    }));
  };

  const handleActivate = async () => {
    await axios.patch(`/rental/${id}`, {
      active: !locationInformations.active,
    });
    fetchLocation();
  };

  const handleChangePrice = (event: React.SyntheticEvent | null) => {
    const val = event.target.value;
    if (val.length === 0) setLocationInformations((prev) => ({...prev, default_price: 0}));
    else if (!val.split("").map((i) => parseInt(i)).includes(NaN)) 
      setLocationInformations((prev) => ({...prev, default_price: parseInt(val)}));
  };

  const handleChangeNbPerson = (event: React.SyntheticEvent | null) => {
    const val = event.target.value;
    if (val.length === 0) setLocationInformations((prev) => ({...prev, nb_max_person: 0}));
    else if (!val.split("").map((i) => parseInt(i)).includes(NaN)) 
      setLocationInformations((prev) => ({...prev, nb_max_person: parseInt(val)}));
  };

  const handleChangeNbBed = (event: React.SyntheticEvent | null) => {
    const val = event.target.value;
    if (val.length === 0) setLocationInformations((prev) => ({...prev, nb_max_bed: 0}));
    else if (!val.split("").map((i) => parseInt(i)).includes(NaN)) 
      setLocationInformations((prev) => ({...prev, nb_max_bed: parseInt(val)}));
  };

  const handleChangeNbRoom = (event: React.SyntheticEvent | null) => {
    const val = event.target.value;
    if (val.length === 0) setLocationInformations((prev) => ({...prev, nb_max_room: 0}));
    else if (!val.split("").map((i) => parseInt(i)).includes(NaN)) 
      setLocationInformations((prev) => ({...prev, nb_max_room: parseInt(val)}));
  };

  const handleSubmitValues = async () => {
    await axios.patch(`/rental/${id}`, {
      default_price: locationInformations.default_price,
      default_currency: locationInformations.default_currency,
      type: locationInformations.type,
      localisation_infos: locationInformations.localisation_infos,
      description: locationInformations.description,
      isValid: locationInformations.isValid,
      active: locationInformations.active,
      title: locationInformations.title,
      nb_max_person: locationInformations.nb_max_person,
      nb_max_bed: locationInformations.nb_max_bed,
      nb_max_room: locationInformations.nb_max_room,
    });
    console.log("ok");
  };

  return (
    <TabPanel value={value}>
      <div className={styles.container}>
        <div className={styles.title}>
          {t("admin:renter.locations.location.informations_tsx.title")}{" "}
          {locationInformations?.active
            ? ""
            : `[${t(
                "admin:renter.locations.location.informations_tsx.not_active"
              )}]`}
        </div>

        {/* ---------ID--------- */}
        <div className={styles.list_container}>
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations?.id}
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.id")}</label>}
              disabled
            />
          </div>

          {/* ---------TITLE--------- */}
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations?.title}
              onChange={(e) =>setLocationInformations((prev) => ({...prev, title: e.target.value,}))}
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.title")}</label>}
            />
          </div>

          {/* ---------PRICE--------- */}
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations?.default_price/* + " " + locationInformations?.default_currency?.substring(0, 1)*/}
              // onChange={(e) => setLocationInformations((prev) => ({...prev, price: parseInt(e.target.value)}))}
              onChange={handleChangePrice}
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.price")}</label>}
              endDecorator={
                <Select value={locationInformations?.default_currency} onChange={handleChangeCurrency}>
                  {enumCurrency.map((item, index) => (<Option key={index} value={item}>{item}</Option>))}
                </Select>}
            />
          </div>

          {/* ---------TYPE--------- */}
          <div className={styles.item}>
            <Select 
            startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.type")}</label>}
            value={locationInformations?.type} onChange={handleChangeRentalType}>
              {enumRentalType.map((item, index) => (<Option key={index} value={item}>{item}</Option>))}
            </Select>
          </div>

          {/* ---------DESCRIPTION--------- */}
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={locationInformations?.description}
              onChange={(e) =>setLocationInformations((prev) => ({...prev, description: e.target.value,}))}
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.description")}</label>}
            />
          </div>

          {/* ---------ACTIVE--------- */}
          <div className={styles.item}>
            <Button sx={{ borderRadius: "6px" }} color={locationInformations?.active ? "danger" : "success"} onClick={() => handleActivate()}>
              {locationInformations?.active
                ? t("admin:renter.locations.location.informations_tsx.list.desactivate")
                : t("admin:renter.locations.location.informations_tsx.list.activate")
              }
            </Button>
          </div>

          {/* ---------PERSON BED ROOM--------- */}
          <div className={styles.item_flex}>
            <Input
              variant="outlined"
              value={locationInformations?.nb_max_person}
              onChange={handleChangeNbPerson}
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.nb_max_person")}</label>}
            />
            <Input
              variant="outlined"
              value={locationInformations?.nb_max_bed}
              onChange={handleChangeNbBed}
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.nb_max_bed")}</label>}
            />
            <Input
              variant="outlined"
              value={locationInformations?.nb_max_room}
              onChange={handleChangeNbRoom}
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.nb_max_room")}</label>}
            />
          </div>

          {/* ---------LOCATION-INFOS--------- */}
          <div className={styles.item}>
            <SearchLocation setLocationInformations={setLocationInformations} localisation_infos={locationInformations?.localisation_infos} />
          </div>

          {/* ---------isValid--------- */}
          <div className={styles.item}>
            <Input
              variant="outlined"
              disabled
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.validated")}</label>}
              endDecorator={
                locationInformations?.isValid 
                ? (<CheckCircleOutlineRoundedIcon color="success" />) 
                : (<HighlightOffRoundedIcon sx={{ color: red[500] }} />)
              }
            />
          </div>

          {/* ---------OWNER--------- */}
          <div className={styles.item}>
            <Input
              variant="outlined"
              value={`${locationInformations?.owner?.firstname} ${locationInformations?.owner?.lastname}`}
              disabled
              startDecorator={<label>{t("admin:renter.locations.location.informations_tsx.list.owner")}</label>}
            />
          </div>

          {/* ---------SUBMIT BUTTON--------- */}
          <div className={styles.item} style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button sx={{ borderRadius: "6px" }} color="success" onClick={handleSubmitValues}>
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
