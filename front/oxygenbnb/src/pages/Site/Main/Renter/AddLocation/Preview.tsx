import styles from "./Preview.module.scss";
import { Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import { FormAddLocationContext } from "../../../../../utils/Context/FormAddLocationContext";
import { Button, ButtonGroup } from "@mui/joy";

const Preview = () => {
  const { t } = useTranslation(["site"]);
  const fees = 13;

  const { setState, locationInformations } = useContext(FormAddLocationContext);

  const [numberOfPeopleSelected, setNumberOfPeopleSelected] = useState(1);
  const [numberOfNightSelected, setNumberOfNightSelected] = useState(0);
  const [nightSelected, setNightSelected] = useState({
    start: dayjs(new Date()).toString(),
    end: dayjs(new Date()).add(1, "day").toString(),
  });

  const [anchor, setAnchor] = useState<{
    date_start: null | HTMLElement;
    date_end: null | HTMLElement;
    people: null | HTMLElement;
  }>({ date_start: null, date_end: null, people: null });
  const [calcPrices, setCalcPrices] = useState<{
    totalPriceXPeople: number;
    total: number;
  }>({
    totalPriceXPeople: locationInformations.price * numberOfNightSelected,
    total: locationInformations.price * numberOfNightSelected + fees,
  });
  const [errorMaxPeople, setErrorMaxPeople] = useState(false);

  const handleChangeDates = (type, date) => {
    if (type === "start") {
      if (
        date > dayjs(nightSelected.end) ||
        nightSelected.end === date.toString()
      )
        setNightSelected({
          start: date.toString(),
          end: date.add(1, "day").toString(),
        });
      else setNightSelected((prev) => ({ ...prev, start: date.toString() }));
    } else {
      let dateEnd = date;
      if (nightSelected.start === date.toString()) dateEnd = date.add(1, "day");
      setNightSelected((prev) => ({ ...prev, end: dateEnd.toString() }));
    }
  };

  useEffect(() => {
    setCalcPrices({
      totalPriceXPeople: locationInformations.price * numberOfNightSelected,
      total: locationInformations.price * numberOfNightSelected + fees,
    });
  }, [locationInformations.price, numberOfNightSelected, fees]);

  useEffect(() => {
    if (numberOfPeopleSelected > locationInformations.nb_person)
      setErrorMaxPeople(true);
    else setErrorMaxPeople(false);
  }, [numberOfPeopleSelected]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>{locationInformations.title}</h1>
          <div>
            <ButtonGroup>
              <Button variant="solid" color="success">
                {t("site:main.renter.add_location.preview_tsx.save")}
              </Button>
              <Button
                variant="solid"
                color="warning"
                onClick={() => setState("Form")}
              >
                {t("site:main.renter.add_location.preview_tsx.edit")}
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.left}>
            <img
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720"
              alt=""
            />
            <div className={styles.description}>
              <p>
                {t(`site:main.room.room_tsx.a_room_for`, {
                  numberMaxOfPeople: numberMaxOfPeople,
                })}
                {locationInformations.nb_person > 1 ? "s" : ""}
              </p>
              <p>{locationInformations.description}</p>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.sector_top}>
              <div className={styles.price}>
                <span style={{ fontSize: 30 }}>
                  {locationInformations.price}{" "}
                  {locationInformations.default_currency.substring(0, 1)}
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
                      {dayjs(nightSelected.start).format("MMMM DD, YYYY")}
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
                      {dayjs(nightSelected.end).format("MMMM DD, YYYY")}
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
                          format="DD/MM/YYYY"
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
                          format="DD/MM/YYYY"
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
                      {numberOfPeopleSelected}{" "}
                      {t("site:main.room.room_tsx.adult")}
                      {numberOfPeopleSelected > 1 ? "s" : ""}
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
                        setNumberOfPeopleSelected(
                          () => numberOfPeopleSelected - 1
                        )
                      }
                      disabled={numberOfPeopleSelected <= 0}
                    >
                      <RemoveRoundedIcon sx={{ color: "#ed6c0280" }} />
                    </Button>
                    <Button disabled>{numberOfPeopleSelected}</Button>
                    <Button
                      onClick={() =>
                        setNumberOfPeopleSelected(
                          () => numberOfPeopleSelected + 1
                        )
                      }
                    >
                      <AddRoundedIcon sx={{ color: "#ed6c0280" }} />
                    </Button>
                  </Menu>
                </div>
              </div>

              <div className={styles.submit_button}>
                <Button
                  variant="solid"
                  color="warning"
                  sx={{ width: "100%", margin: "20px 0" }}
                  disabled={errorMaxPeople}
                >
                  {t("site:main.room.room_tsx.people_submit")}
                </Button>
              </div>
              {errorMaxPeople ? (
                <p style={{ color: "red" }}>
                  {t(`site:main.room.room_tsx.max_people`, {
                    numberMaxOfPeople: locationInformations.nb_person,
                    people: locationInformations.nb_person > 1 ? "s" : "",
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
                      {locationInformations.price}{" "}
                      {locationInformations.default_currency} x{" "}
                      {numberOfNightSelected}{" "}
                      {t("site:main.room.room_tsx.night")}s
                    </div>
                    <div className={styles.lnumber}>
                      {calcPrices.totalPriceXPeople}{" "}
                      {locationInformations.default_currency}
                    </div>
                  </div>
                  <div className={styles.litem}>
                    <div className={styles.linfos}>
                      {t("site:main.room.room_tsx.fees")}
                    </div>
                    <div className={styles.lnumber}>
                      {fees} {locationInformations.default_currency}
                    </div>
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.titem}>
                    <div className={styles.tinfos}>
                      {t("site:main.room.room_tsx.total")}
                    </div>
                    <div className={styles.tnumber}>
                      {calcPrices.total} {locationInformations.default_currency}
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

export default Preview;
