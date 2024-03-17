import styles from "./Menu.module.scss";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useState, MouseEvent, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import SearchLocalisation from "./SearchLocalisation";
import logo from "../../../../assets/Logo OxBNB Menu ow Honr.png"
import { Link } from "react-router-dom";
import { SearchContext } from "../../../../utils/Context/SearchContext";

const MenuComponent = () => {
  const { citySelected, setCitySelected, setNumberOfNightSelected } = useContext(SearchContext)
  const [valuesSearch, setValuesSearch] = useState<any>({where: {}, when_start: "", when_end: "", who: {adult: 0, children: 0}})
  const [anchorElements, setAnchorElements] = useState<{where: null | HTMLElement, when: null | HTMLElement, who: null | HTMLElement}>({where: null,  when: null, who: null});
  const handleOpenWhere = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElements(prev => ({...prev, where: event.currentTarget}));
  };
  const handleOpenWhen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElements(prev => ({...prev, when: event.currentTarget}));
  };
  const handleOpenWho = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElements(prev => ({...prev, who: event.currentTarget}));
  };
  const handleClose = () => {
    setAnchorElements({where: null, when: null, who: null});
  };

  useEffect(() => {
    setValuesSearch(prev => ({...prev, where: citySelected}))
  },[])

  useEffect(() => {
    if(valuesSearch.when_start){
      if(valuesSearch.when_end){
        const diffTime = Math.abs(new Date(valuesSearch.when_end).valueOf() - new Date(valuesSearch.when_start).valueOf());
        console.log(Math.ceil( diffTime / (1000 * 60 * 60 * 24) ))
        setNumberOfNightSelected(Math.ceil( diffTime / (1000 * 60 * 60 * 24) ))
      }
    }
  }, [valuesSearch.when_start, valuesSearch.when_end])

  const selectNewCity = (item) => {
    setValuesSearch(prev => ({...prev, where: item}))
    setCitySelected(item)
  }

  const handleChangeDates = (type, date) => {
    if(type === "start") setValuesSearch(prev => ({...prev, when_start: date.toString()}))
    else {
      let dateEnd = date;
      if(valuesSearch.when_start === date.toString()) dateEnd = date.add(1, 'day')
      setValuesSearch(prev => ({...prev, when_end: dateEnd.toString()}))
    }

  }

  const submit = () => {
    console.log("submit")
  }

  return (
    <>
      <menu className={styles.container}>

        <div className={styles.left}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className={styles.middle}>

          <div className={styles.where}>
            <Button onClick={handleOpenWhere}>
              Where {Object.keys(valuesSearch.where).length === 0 ? "?" : `: ${valuesSearch.where?.address.city || valuesSearch.where?.address.town || valuesSearch.where?.address.village || valuesSearch.where?.address.state}`}
            </Button>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorElements.where}
            open={Boolean(anchorElements.where)}
            sx={{width: '100%', padding: "0"}}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          > 
            <SearchLocalisation handleClose={handleClose} handleReturnCitySelected={(item) => selectNewCity(item)}/>
          </Menu>


          <div className={styles.when_start}>
            <Button onClick={handleOpenWhen}>
              From : {valuesSearch.when_start.length === 0 ? "" : dayjs(valuesSearch.when_start).format('MMM DD')} 
              / To : {valuesSearch.when_end.length === 0 ? "" : dayjs(valuesSearch.when_end).format('MMM DD')}
            </Button>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorElements.when}
            open={Boolean(anchorElements.when)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                <DatePicker
                  value={valuesSearch.when_start === "" ? null : dayjs(valuesSearch.when_start)}
                  format="DD/MM/YYYY"
                  sx={{width: '100%'}}
                  label="Date de départ"
                  // ampm={false}
                  minDate={dayjs(new Date())}
                  maxDate={dayjs(valuesSearch.when_end)}
                  // onChange={value => setValuesSearch(prev => ({...prev, when_start: value.toString()}))}
                  onChange={value => handleChangeDates("start", value)}
                />
              </LocalizationProvider>
              {
                valuesSearch.when_start ?
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                    <DatePicker
                      value={valuesSearch.when_end === "" ? null : dayjs(valuesSearch.when_end)}
                      format="DD/MM/YYYY"
                      sx={{width: '100%'}}
                      label="Date de d'arrivée"
                      // ampm={false}
                      minDate={dayjs(valuesSearch.when_start) > dayjs(new Date()) ? dayjs(valuesSearch.when_start) : dayjs(new Date())}
                      // onChange={value => setValuesSearch(prev => ({...prev, when_end: value.toString()}))}
                      onChange={value => handleChangeDates("end", value)}
                    />
                  </LocalizationProvider>
                :
                  <></>
              }
            </MenuItem>
          </Menu>


          <div className={styles.who}>
            <Button onClick={handleOpenWho}>
               Who : {valuesSearch.who.adult} {valuesSearch.who.adult === 0 ? "people" : "peoples"} {/*<EscalatorWarningRoundedIcon sx={{margin: "0 3px"}}/> {valuesSearch.who.children} */}
            </Button>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorElements.who}
            open={Boolean(anchorElements.who)}
            onClose={handleClose}
            sx={{width: '100%', padding: "0"}}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>
              How many adults :
            </MenuItem>
            <Button onClick={() => setValuesSearch(prev => ({...prev, who: {adult: prev.who.adult-1, children: prev.who.children}}))} disabled={valuesSearch.who.adult <= 0}><RemoveRoundedIcon sx={{color: "#C96217"}}/></Button>
            <Button disabled>{valuesSearch.who.adult}</Button>
            <Button onClick={() => setValuesSearch(prev => ({...prev, who: {adult: prev.who.adult+1, children: prev.who.children}}))}><AddRoundedIcon sx={{color: "#C96217"}}/></Button>

            {/* <MenuItem>
              How many children :
            </MenuItem>
            <Button onClick={() => setValuesSearch(prev => ({...prev, who: {adult: prev.who.adult, children: prev.who.children-1}}))} disabled={valuesSearch.who.children <= 0}><RemoveRoundedIcon sx={{color: "#C96217"}}/></Button>
            <Button disabled>{valuesSearch.who.children}</Button>
            <Button onClick={() => setValuesSearch(prev => ({...prev, who: {adult: prev.who.adult, children: prev.who.children+1}}))}><AddRoundedIcon sx={{color: "#C96217"}}/></Button> */}
          </Menu>

          <Button
            onClick={submit}
            sx={{backgroundColor: "#C96217", borderRadius: "0 10px 10px 0"}}
            disabled={valuesSearch.when_start === "" || valuesSearch.when_end === "" || valuesSearch.who.adult === 0} //where 
          >
            Search
          </Button>

        </div>

        <div className={styles.right}>
          <MenuRoundedIcon/>
          <AccountCircleRoundedIcon/>
        </div>
      </menu>
      {/* {
        middleExtended ?
          <MiddleExtended/>
        :
          <></>
      } */}
    </>

  )
}

export default MenuComponent