import { Link, useParams } from "react-router-dom";
import styles from "./Room.module.scss";
import { Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../../utils/Context/SearchContext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import "dayjs/locale/fr";

const Room = () => {
  const { t } = useTranslation(["site_main"]);
  const { id } = useParams();
  const thisPrice = 35;
  const fees = 13;
  const numberMaxOfPeople = 4;

  const {
    numberOfPeopleSelected,
    setNumberOfPeopleSelected,
    numberOfNightSelected,
    nightSelected,
    setNightSelected,
    setNumberOfNightSelected
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
    totalPriceXPeople: thisPrice * numberOfNightSelected,
    total: thisPrice * numberOfNightSelected + fees,
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
    if(nightSelected.start){
      if(nightSelected.end){
        const date_diff = dayjs(nightSelected.end).diff(dayjs(nightSelected.start), "day")
        setNumberOfNightSelected(date_diff)
        // const diffTime = Math.abs(new Date(nightSelected.end).valueOf() - new Date(nightSelected.start).valueOf());
        // console.log(Math.ceil( diffTime / (1000 * 60 * 60 * 24) ))
        // setNumberOfNightSelected(Math.ceil( diffTime / (1000 * 60 * 60 * 24) ))
      }
    }
  }, [nightSelected.start, nightSelected.end])

  useEffect(() => {
    setCalcPrices({
      totalPriceXPeople: thisPrice * numberOfNightSelected,
      total: thisPrice * numberOfNightSelected + fees,
    });
  }, [thisPrice, numberOfNightSelected, fees]);

  useEffect(() => {
    if (
      numberOfPeopleSelected.adult + numberOfPeopleSelected.children >
      numberMaxOfPeople
    )
      setErrorMaxPeople(true);
    else setErrorMaxPeople(false);
  }, [numberOfPeopleSelected]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>
          {t("site_main:main.room.room_tsx.room")} {id}
        </h1>
        <div className={styles.box}>
          <div className={styles.left}>
            <img
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720"
              alt=""
            />
            <div className={styles.description}>
              <p>
                {t(`site_main:main.room.room_tsx.a_room_for`, {
                  numberMaxOfPeople: numberMaxOfPeople,
                })}
                {numberMaxOfPeople > 1 ? "s" : ""}
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                nulla impedit harum est neque minima quaerat eos dolore deserunt
                natus tempora omnis inventore illum totam modi, quisquam
                praesentium, veniam perspiciatis.
              </p>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.sector_top}>
              <div className={styles.price}>
                <span style={{ fontSize: 30 }}>{thisPrice} {t('site_main:main.room.room_tsx.euro')}</span>/{t('site_main:main.room.room_tsx.night')}
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
                    <div className={styles.ltop}>{t('site_main:main.room.room_tsx.start_date')}</div>
                    <div className={styles.lbottom}>
                      {dayjs(nightSelected.start).locale(t("site_main:main.room.room_tsx.format")).format(t("site_main:main.room.room_tsx.date_format"))}
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
                    <div className={styles.rtop}>{t('site_main:main.room.room_tsx.end_date')}</div>
                    <div className={styles.rbottom}>
                      {dayjs(nightSelected.end).locale(t("site_main:main.room.room_tsx.format")).format(t("site_main:main.room.room_tsx.date_format"))}
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
                          format={t('site_main:main.room.room_tsx.date_picker_format')}
                          sx={{ width: "100%" }}
                          label={t('site_main:main.room.room_tsx.start_date')}
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
                          format={t('site_main:main.room.room_tsx.date_picker_format')}
                          sx={{ width: "100%" }}
                          label={t('site_main:main.room.room_tsx.end_date')}
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
                    <div className={styles.ctop}>{t('site_main:main.room.room_tsx.nb_people')}</div>
                    <div className={styles.cbottom}>
                      {numberOfPeopleSelected.adult} {t('site_main:main.room.room_tsx.adult')}
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
                    <MenuItem>{t('site_main:main.room.room_tsx.how_many_adult')}{" "}:</MenuItem>
                    <Button
                      onClick={() =>
                        setNumberOfPeopleSelected((prev) => ({
                          ...prev,
                          adult: prev.adult - 1,
                        }))
                      }
                      disabled={numberOfPeopleSelected.adult <= 0}
                    >
                      <RemoveRoundedIcon sx={{ color: "#ed6c0280" }} />
                    </Button>
                    <Button disabled>{numberOfPeopleSelected.adult}</Button>
                    <Button
                      onClick={() =>
                        setNumberOfPeopleSelected((prev) => ({
                          ...prev,
                          adult: prev.adult + 1,
                        }))
                      }
                    >
                      <AddRoundedIcon sx={{ color: "#ed6c0280" }} />
                    </Button>

                    {/* <MenuItem>
                      {t('site_main:main.room.room_tsx.how_many_children')}{" "}:
                    </MenuItem>
                    <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, children: prev.children-1}))} disabled={numberOfPeopleSelected.children <= 0}><RemoveRoundedIcon sx={{color: "#ed6c0280"}}/></Button>
                    <Button disabled>{numberOfPeopleSelected.children}</Button>
                    <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, children: prev.children+1}))}><AddRoundedIcon sx={{color: "#ed6c0280"}}/></Button> */}
                  </Menu>
                </div>
              </div>

              <div className={styles.submit_button}>
                <Link to="reservation">
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ width: "100%", margin: "20px 0" }}
                    disabled={errorMaxPeople}
                  >
                    {t('site_main:main.room.room_tsx.people_submit')}
                  </Button>
                </Link>
              </div>
              {errorMaxPeople ? (
                <p style={{ color: "red" }}>
                  {t(`site_main:main.room.room_tsx.max_people`, {numberMaxOfPeople: numberMaxOfPeople, people: numberMaxOfPeople > 1 ? "s" : ""})}
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
                      {thisPrice} {t('site_main:main.room.room_tsx.euro')} x {numberOfNightSelected} {t('site_main:main.room.room_tsx.night')}s
                    </div>
                    <div className={styles.lnumber}>
                      {calcPrices.totalPriceXPeople} {t('site_main:main.room.room_tsx.euro')}
                    </div>
                  </div>
                  <div className={styles.litem}>
                    <div className={styles.linfos}>{t('site_main:main.room.room_tsx.fees')}</div>
                    <div className={styles.lnumber}>{fees} {t('site_main:main.room.room_tsx.euro')}</div>
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.titem}>
                    <div className={styles.tinfos}>{t('site_main:main.room.room_tsx.total')}</div>
                    <div className={styles.tnumber}>{calcPrices.total} {t('site_main:main.room.room_tsx.euro')}</div>
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