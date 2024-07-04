import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { endQuery, NOMINATIM_BASE_URL } from "@utils/utils";

const SearchLocalisation = ({ handleClose, handleReturnCitySelected }) => {
  const [listOfLocalisations, setListOfLocalisations] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedBoolean, setSearchedBoolean] = useState(false);
  const { t } = useTranslation(["site"]);

  const handleSelectCity = (item) => {
    handleReturnCitySelected(item);
    setQuery("");
    setListOfLocalisations([]);
    setSearchedBoolean(false);

    handleClose();
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (query.length > 0) {
        const queryString = `search?q=${query}${endQuery}`;
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
          method: "GET",
          redirect: "follow",
        })
          .then((response) => response.text())
          .then((result) => {
            setListOfLocalisations(JSON.parse(result));
            setSearchedBoolean(true);
          })
          .catch((err) => console.log("err: ", err));
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <>
      <div style={{ padding: " 5px" }}>
        <TextField
          label="Localisations" //todo
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
              <MenuItem key={index} onClick={() => handleSelectCity(item)}>
                {/* {item.address.city ||
                  item.address.town ||
                  item.address.village ||
                  item.address.state}
                {item.address.postcode ? ` (${item.address.postcode})` : ""},{" "}
                {item.address.country === "États-Unis d'Amérique"
                  ? "USA"
                  : item.address.country} */}
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
