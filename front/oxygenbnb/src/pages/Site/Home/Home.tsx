import styles from "./Home.module.scss"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import Menu from "./Default/Menu/Menu";
import Footer from "./Default/Footer";
import { Box, MenuItem, Paper } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { endQuery, NOMINATIM_BASE_URL } from "../../../utils/utils";
import { SearchContext } from "./../../../utils/Context/SearchContext";
// import { SearchContext } from "../../../App";

const Home = () => {
  const { setCitySelected } = useContext(SearchContext);
  const [listOfLocalisations, setListOfLocalisations] = useState([])
  const [query, setQuery] = useState("")
  const [searchedBoolean, setSearchedBoolean] = useState(false)


  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(query.length > 0){
        const queryString = `search?q=${query}${endQuery}`;
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, { method: "GET", redirect: "follow"})
          .then((response) => response.text())
          .then((result) => {
            setListOfLocalisations(JSON.parse(result));
            setSearchedBoolean(true)
          })
          .catch((err) => console.log("err: ", err));
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);


  const closeResults = (e) => {
    if(e.target.id !== "input-search")  setSearchedBoolean(false)
  }

  const navigate = useNavigate();
  const searching = async (city) => {
    if(Object.keys(city).length > 0){
      setCitySelected(city);
      return navigate('/o/search');
    }
  }

  return (
    <>
      <div onClick={closeResults}>
        <Menu/>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.catch_phrase}>Where do you want to travel this <span style={{color:"#C96217"}}>summer</span> ?</div>
              
            <FormControl sx={{ mt: 2,width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-search" id="input-search"></InputLabel>
              <OutlinedInput
                id="input-search"
                type={'text'}
                onChange={(e) => setQuery(e.target.value)}
                endAdornment={
                  <InputAdornment position="end" id="input-search">
                  <IconButton
                      // onClick={handleClickSearch}
                      id="input-search"
                      edge="end"
                    >
                      {<SearchRoundedIcon id="input-search"/>}
                    </IconButton>
                  </InputAdornment>
                }
                label=""
              />
              {
                searchedBoolean ?
                  <Box>
                    <Paper>
                      {
                        listOfLocalisations.length === 0 ?
                          <MenuItem value={listOfLocalisations[0]} disabled>No result found</MenuItem>
                        :
                          listOfLocalisations.map((item, index) => (
                            <MenuItem key={index} onClick={() => searching(item)}>
                              {item.address.city || item.address.town || item.address.village || item.address.state || item.address.island}
                              {item.address.postcode ? ` (${item.address.postcode})` :  ''}
                              , {item.address.country === "États-Unis d'Amérique" ? "USA" : item.address.country}
                            </MenuItem>
                          ))
                        }
                      </Paper>
                    </Box>
                  :
                    <></>
                }
            </FormControl>
            
          </div>
          {/* {citySelected?.address} */}
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Home