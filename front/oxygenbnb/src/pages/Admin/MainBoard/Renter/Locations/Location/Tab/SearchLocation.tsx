import React, { useEffect, useState } from 'react'
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { MenuItem } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { NOMINATIM_BASE_URL } from "@utils/utils";
import { useTranslation } from "react-i18next";


const SearchLocation = ({localisation_infos, setLocationInformations}) => {
  const [listOfLocalisations, setListOfLocalisations] = useState([]);
  const [searchedBoolean, setSearchedBoolean] = useState(false);
  const { t } = useTranslation(["site"]);
  const [query, setQuery] = useState<string>("{}");

  const handleSelectCity = (item) => {
    setLocationInformations((prev) => ({
      ...prev,
      localisation_infos: JSON.stringify(item),
    }));
    setQuery(item.display_name);
    setListOfLocalisations([]);
    setSearchedBoolean(false);
  };

  useEffect(() => { 
    if(localisation_infos) setQuery(JSON.parse(localisation_infos)?.display_name)
  }, [localisation_infos])

  const searchForQuery = () => {
    if (query.length > 0) {
      const queryString = `q=${query}&format=json&addressdetails=1&polygon_geojson=0&limit=20&layer=address`;
      fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.text())
        .then((result) => {
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
      <Input
        value={query}
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
    </>
  )
}

export default SearchLocation