import { Button } from "@mui/material";
import styles from "./MiddleExtended.module.scss";
import { useState, MouseEvent, useContext, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import SearchLocalisation from "./SearchLocalisation";
import { SearchContext } from "@utils/Context/SearchContext";
import { useTranslation } from "react-i18next";
import "dayjs/locale/fr";
import "dayjs/locale/en-gb";

const MiddleExtended = () => {
  const { t } = useTranslation(["site"]);
  const {
    citySelected,
    updateCitySelected,
    updateNumberOfNightSelected,
    numberOfPeopleSelected,
    updateNumberOfPeopleSelected,
    nightSelected,
    updateNightSelected,
  } = useContext(SearchContext);

  const [anchorElements, setAnchorElements] = useState<{
    where: null | HTMLElement;
    when: null | HTMLElement;
    who: null | HTMLElement;
  }>({ where: null, when: null, who: null });
  const handleOpenWhere = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElements((prev) => ({ ...prev, where: event.currentTarget }));
  };
  const handleOpenWhen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElements((prev) => ({ ...prev, when: event.currentTarget }));
  };
  const handleOpenWho = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElements((prev) => ({ ...prev, who: event.currentTarget }));
  };
  const handleClose = () => {
    setAnchorElements({ where: null, when: null, who: null });
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
  return (
    <div className={styles.middle}>
      <div className={styles.where}>
        <Button onClick={handleOpenWhere}>
          {t(
            "site:default.menu.middle_extended.middle_extended_tsx.where.title"
          )}{" "}
          {Object.keys(citySelected).length === 0
            ? "?"
            : `: ${
                citySelected?.address?.city ||
                citySelected?.address?.town ||
                citySelected?.address?.village ||
                citySelected?.address?.state
              }`}
        </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorElements.where}
        open={Boolean(anchorElements.where)}
        sx={{ width: "100%", padding: "0" }}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <SearchLocalisation
          handleClose={handleClose}
          handleReturnCitySelected={(item) => updateCitySelected(item)}
        />
      </Menu>

      <div className={styles.when_start}>
        <Button onClick={handleOpenWhen}>
          {t(
            "site:default.menu.middle_extended.middle_extended_tsx.when_start.from"
          )}{" "}
          :{" "}
          {nightSelected.start.length === 0
            ? ""
            : dayjs(nightSelected.start).format(
                t(
                  "site:default.menu.middle_extended.middle_extended_tsx.when_start.format"
                )
              )}
          /{" "}
          {t(
            "site:default.menu.middle_extended.middle_extended_tsx.when_start.to"
          )}{" "}
          :{" "}
          {nightSelected.end.length === 0
            ? ""
            : dayjs(nightSelected.end).format(
                t(
                  "site:default.menu.middle_extended.middle_extended_tsx.when_start.format"
                )
              )}
        </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorElements.when}
        open={Boolean(anchorElements.when)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={t(
              "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.lang"
            )}
          >
            <DatePicker
              value={
                nightSelected.start === "" ? null : dayjs(nightSelected.start)
              }
              format={t(
                "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.format"
              )}
              sx={{ width: "100%" }}
              label={t(
                "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.start_input.label"
              )}
              minDate={dayjs(new Date())}
              onChange={(value) => handleChangeDates("start", value)}
            />
          </LocalizationProvider>
          {nightSelected.start ? (
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={t(
                "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.lang"
              )}
            >
              <DatePicker
                value={
                  nightSelected.end === "" ? null : dayjs(nightSelected.end)
                }
                format={t(
                  "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.format"
                )}
                sx={{ width: "100%" }}
                label={t(
                  "site:default.menu.middle_extended.middle_extended_tsx.when_start_menu.end_input.label"
                )}
                minDate={
                  dayjs(nightSelected.start) > dayjs(new Date())
                    ? dayjs(nightSelected.start).add(1, "day")
                    : dayjs(new Date()).add(1, "day")
                }
                onChange={(value) => handleChangeDates("end", value)}
              />
            </LocalizationProvider>
          ) : (
            <></>
          )}
        </MenuItem>
      </Menu>

      <div className={styles.who}>
        <Button onClick={handleOpenWho}>
          {t("site:default.menu.middle_extended.middle_extended_tsx.who.title")}{" "}
          : {numberOfPeopleSelected.adult}{" "}
          {t(
            "site:default.menu.middle_extended.middle_extended_tsx.who.people1"
          )}
          {numberOfPeopleSelected.adult > 1 ? "s" : ""}{" "}
          {/*<EscalatorWarningRoundedIcon sx={{margin: "0 3px"}}/> {numberOfPeopleSelected.children} */}
        </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorElements.who}
        open={Boolean(anchorElements.who)}
        onClose={handleClose}
        sx={{ width: "100%", padding: "0" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          {`${t(
            "site:default.menu.middle_extended.middle_extended_tsx.who_menu.title1"
          )}: `}
        </MenuItem>
        <Button
          onClick={() =>
            updateNumberOfPeopleSelected({ 
              childen: 0,
              adult: numberOfPeopleSelected.adult - 1,
            })
          }
          disabled={numberOfPeopleSelected.adult === 1}
        >
          <RemoveRoundedIcon
            sx={{
              color: numberOfPeopleSelected.adult === 1 ? "grey" : "#ed6c0280",
            }}
          />
        </Button>
        <Button disabled>{numberOfPeopleSelected.adult}</Button>
        <Button
          onClick={() => 
            updateNumberOfPeopleSelected({ 
              childen: 0,
              adult: numberOfPeopleSelected.adult + 1,
            })
          }
        >
          <AddRoundedIcon sx={{ color: "#ed6c0280" }} />
        </Button>

        {/* <MenuItem>
          How many children :
        </MenuItem>
        <Button onClick={() => updateNumberOfPeopleSelected({...numberOfPeopleSelected, children: numberOfPeopleSelected.children-1})} disabled={numberOfPeopleSelected.children <= 0}><RemoveRoundedIcon sx={{color: "#ed6c0280"}}/></Button>
        <Button disabled>{numberOfPeopleSelected.children}</Button>
        <Button onClick={() => updateNumberOfPeopleSelected({...numberOfPeopleSelected, children: numberOfPeopleSelected.children+1})}><AddRoundedIcon sx={{color: "#ed6c0280"}}/></Button> */}
      </Menu>

      {/* <Button
        onClick={submit}
        sx={{backgroundColor: "#ed6c0280", borderRadius: "0 10px 10px 0"}}
        disabled={nightSelected.start === "" || nightSelected.end === "" || numberOfPeopleSelected.adult === 0} //where 
      >
        Search
      </Button> */}
    </div>
  );
};

export default MiddleExtended;
