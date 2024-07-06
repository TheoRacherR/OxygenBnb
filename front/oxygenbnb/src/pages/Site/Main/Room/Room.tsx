import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Room.module.scss";
import { Button, Menu, MenuItem, ButtonGroup } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "@utils/Context/SearchContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import "dayjs/locale/fr";
import axios from "axios";
import { Rental } from "../../../../../../../back/oxygenbnb/src/tables/rental/entities/rental.entity";
import { getUserInfos } from "@utils/utils";

// import path from "../../../../../../../back/oxygenbnb/src/uploads/634cdbdfb0d76388af892001ac5a98fc"

const Room = () => {
  const { t } = useTranslation(["site"]);
  const { id } = useParams();
  const fees = 13;

  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role: stirng;
  }>();
  const [locationData, setLocationData] = useState<Rental>();
  const fetchLocation = async () => {
    if (
      !id
        .split("")
        .map((i) => parseInt(i))
        .includes(NaN)
    ) {
      try {
        const locationRaw: { data: Rental } = await axios.get(`/rental/${id}`);
        setLocationData(locationRaw.data);
        if (
          !locationRaw.data.active &&
          userData.id !== locationRaw.data.owner.id
        )
          return navigate("/o/404");
        setCalcPrices({
          totalPriceXPeople:
            locationRaw.data.default_price * numberOfNightSelected,
          total: locationRaw.data.default_price * numberOfNightSelected + fees,
        });
      } catch (e) {
        if (e.response.status === 404) return navigate("/o/404");
      }
    } else return navigate("/o/404");
  };

  const fetchUserData = async () => {
    const usr = await getUserInfos();
    if (usr) setUserData(usr);
  };

  useEffect(() => {
    if (userData) fetchLocation();
    else fetchUserData();
  }, [userData]);

  const {
    numberOfPeopleSelected,
    updateNumberOfPeopleSelected,
    numberOfNightSelected,
    nightSelected,
    updateNightSelected,
    updateNumberOfNightSelected,
  } = useContext(SearchContext);

  const [anchor, setAnchor] = useState<{
    date_start: null | HTMLElement;
    date_end: null | HTMLElement;
    people: null | HTMLElement;
  }>({ date_start: null, date_end: null, people: null });

  const [calcPrices, setCalcPrices] = useState<{
    totalPriceXPeople: number;
    total: number;
  }>({
    totalPriceXPeople: locationData?.default_price * numberOfNightSelected,
    total: locationData?.default_price * numberOfNightSelected + fees,
  });
  const [errorMaxPeople, setErrorMaxPeople] = useState(false);

  const handleChangeDates = (type, date) => {
    if (type === "start") {
      if (
        date > dayjs(nightSelected.end) ||
        nightSelected.end === date.toString()
      )
        updateNightSelected({
          start: date.toString(),
          end: date.add(1, "day").toString(),
        });
      else updateNightSelected({ ...nightSelected, start: date.toString() });
    } else {
      let dateEnd = date;
      if (nightSelected.start === date.toString()) dateEnd = date.add(1, "day");
      updateNightSelected({ ...nightSelected, end: dateEnd.toString() });
    }
  };

  useEffect(() => {
    if (nightSelected.start) {
      if (nightSelected.end) {
        const date_diff = dayjs(nightSelected.end).diff(
          dayjs(nightSelected.start),
          "day"
        );
        updateNumberOfNightSelected(date_diff);
      }
    }
  }, [nightSelected.start, nightSelected.end]);

  useEffect(() => {
    if (locationData) {
      setCalcPrices({
        totalPriceXPeople: locationData?.default_price * numberOfNightSelected,
        total: locationData?.default_price * numberOfNightSelected + fees,
      });
    }
  }, [numberOfNightSelected, fees]);

  useEffect(() => {
    if (
      numberOfPeopleSelected.adult + numberOfPeopleSelected.children >
      locationData?.nb_max_person
    )
      setErrorMaxPeople(true);
    else setErrorMaxPeople(false);
  }, [numberOfPeopleSelected]);

  const activateRental = async () => {
    const patch = await axios.patch(`/rental/${id}`, {
      active: !locationData.active,
    });
    if (patch.status === 200)
      setLocationData({ ...locationData, active: !locationData.active });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>
            {t("site:main.room.room_tsx.location")} '{locationData?.title}' {id}
          </h1>
          {locationData?.owner?.id === userData?.id ? (
            <ButtonGroup sx={{ height: "fit-content" }}>
              <Button
                variant="contained"
                color={locationData?.active ? "error" : "success"}
                onClick={activateRental}
              >
                {locationData?.active
                  ? t("site:main.room.room_tsx.desactivate")
                  : t("site:main.room.room_tsx.activate")}
              </Button>
              <Link to={`/admin/renter/location/${locationData?.id}`}>
                <Button variant="contained" color="warning">
                  {t("site:main.room.room_tsx.edit")}
                </Button>
              </Link>
            </ButtonGroup>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.box}>
          <div className={styles.left}>
            {/* <img
              // src={path}
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720"
              alt=""
            /> */}
            <div className={styles.description}>
              <p>
                {t(`site:main.room.room_tsx.a_location_for`, {
                  numberMaxOfPeople: locationData?.nb_max_person,
                })}
                {locationData?.nb_max_person > 1 ? "s" : ""}{" "}
                {locationData?.nb_max_room} {t("site:main.room.room_tsx.room")}
                {locationData?.nb_max_room > 1 ? "s" : ""},{" "}
                {locationData?.nb_max_bed} {t("site:main.room.room_tsx.bed")}
                {locationData?.nb_max_bed > 1 ? "s" : ""}
              </p>
              <p>{locationData?.description}</p>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.sector_top}>
              <div className={styles.price}>
                <span style={{ fontSize: 30 }}>
                  {locationData?.default_price}{" "}
                  {t("site:main.room.room_tsx.euro")}
                </span>
                /{t("site:main.room.room_tsx.night")}
              </div>

              <div className={styles.dates} id="dates">
                <div className={styles.dtop}>
                  <div
                    className={styles.dleft}
                    onClick={(e) =>
                      setAnchor({
                        date_start: e.currentTarget,
                        date_end: null,
                        people: null,
                      })
                    }
                  >
                    <div className={styles.ltop}>
                      {t("site:main.room.room_tsx.start_date")}
                    </div>
                    <div className={styles.lbottom}>
                      {dayjs(nightSelected.start)
                        .locale(t("site:main.room.room_tsx.format"))
                        .format(t("site:main.room.room_tsx.date_format"))}
                    </div>
                  </div>

                  <div
                    className={styles.dright}
                    id="dateRight"
                    onClick={(e) =>
                      setAnchor({
                        date_start: null,
                        date_end: e.currentTarget,
                        people: null,
                      })
                    }
                  >
                    <div className={styles.rtop}>
                      {t("site:main.room.room_tsx.end_date")}
                    </div>
                    <div className={styles.rbottom}>
                      {dayjs(nightSelected.end)
                        .locale(t("site:main.room.room_tsx.format"))
                        .format(t("site:main.room.room_tsx.date_format"))}
                    </div>
                  </div>

                  <Menu
                    anchorEl={anchor.date_start}
                    open={Boolean(anchor.date_start)}
                    onClose={() =>
                      setAnchor({
                        date_start: null,
                        date_end: null,
                        people: null,
                      })
                    }
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="fr"
                      >
                        <DatePicker
                          value={
                            nightSelected.start === ""
                              ? null
                              : dayjs(nightSelected.start)
                          }
                          format={t(
                            "site:main.room.room_tsx.date_picker_format"
                          )}
                          sx={{ width: "100%" }}
                          label={t("site:main.room.room_tsx.start_date")}
                          minDate={dayjs(new Date())}
                          onChange={(value) =>
                            handleChangeDates("start", value)
                          }
                        />
                      </LocalizationProvider>
                    </MenuItem>
                  </Menu>

                  <Menu
                    anchorEl={anchor.date_end}
                    open={Boolean(anchor.date_end)}
                    onClose={() =>
                      setAnchor({
                        date_start: null,
                        date_end: null,
                        people: null,
                      })
                    }
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="fr"
                      >
                        <DatePicker
                          value={
                            nightSelected.end === ""
                              ? null
                              : dayjs(nightSelected.end)
                          }
                          format={t(
                            "site:main.room.room_tsx.date_picker_format"
                          )}
                          sx={{ width: "100%" }}
                          label={t("site:main.room.room_tsx.end_date")}
                          minDate={
                            dayjs(nightSelected.start) > dayjs(new Date())
                              ? dayjs(nightSelected.start).add(1, "day")
                              : dayjs(new Date()).add(1, "day")
                          }
                          onChange={(value) => handleChangeDates("end", value)}
                        />
                      </LocalizationProvider>
                    </MenuItem>
                  </Menu>
                </div>
                <div className={styles.dbottom}>
                  <div
                    className={styles.ctnt}
                    onClick={(e) =>
                      setAnchor({
                        date_start: null,
                        date_end: null,
                        people: e.currentTarget,
                      })
                    }
                  >
                    <div className={styles.ctop}>
                      {t("site:main.room.room_tsx.nb_people")}
                    </div>
                    <div className={styles.cbottom}>
                      {numberOfPeopleSelected.adult}{" "}
                      {t("site:main.room.room_tsx.adult")}
                      {numberOfPeopleSelected.adult > 1 ? "s" : ""}
                    </div>
                  </div>
                  <Menu
                    anchorEl={anchor.people}
                    open={Boolean(anchor.people)}
                    onClose={() =>
                      setAnchor({
                        date_start: null,
                        date_end: null,
                        people: null,
                      })
                    }
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem>
                      {t("site:main.room.room_tsx.how_many_adult")} :
                    </MenuItem>
                    <Button
                      onClick={() =>
                        updateNumberOfPeopleSelected({
                          ...numberOfPeopleSelected,
                          adult: numberOfPeopleSelected.adult - 1,
                        })
                      }
                      disabled={numberOfPeopleSelected.adult <= 0}
                    >
                      <RemoveRoundedIcon sx={{ color: "#ed6c0280" }} />
                    </Button>
                    <Button disabled>{numberOfPeopleSelected.adult}</Button>
                    <Button
                      onClick={() =>
                        updateNumberOfPeopleSelected({
                          ...numberOfPeopleSelected,
                          adult: numberOfPeopleSelected.adult + 1,
                        })
                      }
                    >
                      <AddRoundedIcon sx={{ color: "#ed6c0280" }} />
                    </Button>

                    {/* <MenuItem>
                      {t('site:main.room.room_tsx.how_many_children')}{" "}:
                    </MenuItem>
                    <Button onClick={() => updateNumberOfPeopleSelected(prev => ({...prev, children: prev.children-1}))} disabled={numberOfPeopleSelected.children <= 0}><RemoveRoundedIcon sx={{color: "#ed6c0280"}}/></Button>
                    <Button disabled>{numberOfPeopleSelected.children}</Button>
                    <Button onClick={() => updateNumberOfPeopleSelected(prev => ({...prev, children: prev.children+1}))}><AddRoundedIcon sx={{color: "#ed6c0280"}}/></Button> */}
                  </Menu>
                </div>
              </div>

              <div className={styles.submit_button}>
                <Link
                  to="reservation"
                  style={{
                    pointerEvents:
                      locationData?.owner?.id === userData?.id
                        ? "none"
                        : "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ width: "100%", margin: "20px 0" }}
                    disabled={
                      errorMaxPeople || locationData?.owner?.id === userData?.id
                    }
                  >
                    {t("site:main.room.room_tsx.people_submit")}
                  </Button>
                </Link>
              </div>
              {errorMaxPeople ? (
                <p style={{ color: "red" }}>
                  {t(`site:main.room.room_tsx.max_people`, {
                    numberMaxOfPeople: locationData?.nb_max_person,
                    people: locationData?.nb_max_person > 1 ? "s" : "",
                  })}
                </p>
              ) : (
                <></>
              )}
            </div>

            <div className={styles.sector_bot}>
              <div className={styles.recapitulation}>
                <div className={styles.listing}>
                  <div className={styles.litem}>
                    <div className={styles.linfos}>
                      {locationData?.default_price}{" "}
                      {t("site:main.room.room_tsx.euro")} x{" "}
                      {numberOfNightSelected}{" "}
                      {t("site:main.room.room_tsx.night")}s
                    </div>
                    <div className={styles.lnumber}>
                      {calcPrices.totalPriceXPeople}{" "}
                      {t("site:main.room.room_tsx.euro")}
                    </div>
                  </div>
                  <div className={styles.litem}>
                    <div className={styles.linfos}>
                      {t("site:main.room.room_tsx.fees")}
                    </div>
                    <div className={styles.lnumber}>
                      {fees} {t("site:main.room.room_tsx.euro")}
                    </div>
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.titem}>
                    <div className={styles.tinfos}>
                      {t("site:main.room.room_tsx.total")}
                    </div>
                    <div className={styles.tnumber}>
                      {calcPrices.total} {t("site:main.room.room_tsx.euro")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
