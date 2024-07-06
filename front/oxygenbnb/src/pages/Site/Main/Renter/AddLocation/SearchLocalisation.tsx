import { Input, Button } from "@mui/joy";
import { MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { FormAddLocationContext } from "@utils/Context/FormAddLocationContext";
import { endQuery, NOMINATIM_BASE_URL } from "@utils/utils";
// const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchLocalisation = ({ error }) => {
  const [listOfLocalisations, setListOfLocalisations] = useState([]);
  const [searchedBoolean, setSearchedBoolean] = useState(false);
  const { t } = useTranslation(["site"]);
  const { locationInformations, setLocationInformations } = useContext(
    FormAddLocationContext
  );
  const [query, setQuery] = useState(
    JSON.parse(locationInformations.localisation_infos)?.display_name || ""
  );

  const handleSelectCity = (item) => {
    setLocationInformations((prev) => ({
      ...prev,
      localisation_infos: JSON.stringify(item),
    }));
    setQuery(item.display_name);
    setListOfLocalisations([]);
    setSearchedBoolean(false);
  };

  const searchForQuery = () => {
    if (query.length > 0) {
      const queryString = `search?q=${query}${endQuery}`;
      fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.text())
        .then((result) => {
          {
            error;
          }
          setListOfLocalisations(
            JSON.parse(result).filter(
              (r) => r.addresstype === "place" || r.addresstype === "building"
            )
          );
          setSearchedBoolean(true);
        })
        .catch((err) => console.log("err: ", err));
    }
  };

  return (
    <>
      <div style={{ padding: " 5px" }}>
        <Input
          value={query}
          error={error}
          onChange={(e) => setQuery(e.target.value)}
          startDecorator={<label>Rue</label>}
          endDecorator={
            <Button onClick={searchForQuery} color="neutral">
              <SearchRoundedIcon />
            </Button>
          }
        />
        {searchedBoolean ? (
          listOfLocalisations.length === 0 ? (
            <MenuItem disabled>
              {t(
                "site:default.menu.middle_extended.search_localisation_tsx.not_found"
              )}
            </MenuItem>
          ) : (
            listOfLocalisations.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => handleSelectCity(item)}
                sx={{ overflowX: "hidden" }}
              >
                {item.display_name}
              </MenuItem>
            ))
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SearchLocalisation;
