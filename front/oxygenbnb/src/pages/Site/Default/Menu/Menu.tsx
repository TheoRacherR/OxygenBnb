import styles from "./Menu.module.scss";
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
import SearchLocalisation from "./SearchLocalisation";
import logo from "../../../../assets/Logo OxBNB Menu ow Honr.png"
import { Link } from "react-router-dom";
import { SearchContext } from "../../../../utils/Context/SearchContext";
import RightMenu from "./RightMenu/RightMenu";



const MenuComponent = () => {
  const { 
    citySelected, setCitySelected, 
    setNumberOfNightSelected, 
    numberOfPeopleSelected, setNumberOfPeopleSelected, 
    nightSelected, setNightSelected
  } = useContext(SearchContext);

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
    if(nightSelected.start){
      if(nightSelected.end){
        const diffTime = Math.abs(new Date(nightSelected.end).valueOf() - new Date(nightSelected.start).valueOf());
        // console.log(Math.ceil( diffTime / (1000 * 60 * 60 * 24) ))
        setNumberOfNightSelected(Math.ceil( diffTime / (1000 * 60 * 60 * 24) ))
      }
    }
  }, [nightSelected.start, nightSelected.end])


  // const handleChangeDates = (type, date) => {
  //   if(type === "start") setNightSelected(prev => ({...prev, start: date.toString()}))
  //   else {
  //     let dateEnd = date;
  //     if(nightSelected.start === date.toString()) dateEnd = date.add(1, 'day')
  //     setNightSelected(prev => ({...prev, end: dateEnd.toString()}))
  //   }
  // }

  const handleChangeDates = (type, date) => {
    if(type === "start"){
      if((date > dayjs(nightSelected.end) || (nightSelected.end === date.toString()))) 
        setNightSelected({start: date.toString(), end: date.add(1, 'day').toString()})
      else 
        setNightSelected(prev => ({...prev, start: date.toString()}))
      
    }
    else {
      let dateEnd = date;
      if(nightSelected.start === date.toString()) dateEnd = date.add(1, 'day')
      setNightSelected(prev => ({...prev, end: dateEnd.toString()}))
    }
  }

  // const submit = () => {
  //   console.log("submit")
  // }

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
              Where {Object.keys(citySelected).length === 0 ? "?" : `: ${citySelected?.address.city || citySelected?.address.town || citySelected?.address.village || citySelected?.address.state}`}
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
            <SearchLocalisation handleClose={handleClose} handleReturnCitySelected={(item) => setCitySelected(item)}/>
          </Menu>


          <div className={styles.when_start}>
            <Button onClick={handleOpenWhen}>
              From : {nightSelected.start.length === 0 ? "" : dayjs(nightSelected.start).format('MMM DD')} 
              / To : {nightSelected.end.length === 0 ? "" : dayjs(nightSelected.end).format('MMM DD')}
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
                  value={nightSelected.start === "" ? null : dayjs(nightSelected.start)}
                  format="DD/MM/YYYY"
                  sx={{width: '100%'}}
                  label="Date d'arrivée"
                  minDate={dayjs(new Date())}
                  onChange={value => handleChangeDates("start", value)}
                />
              </LocalizationProvider>
              {
                nightSelected.start ?
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
                    <DatePicker
                      value={nightSelected.end === "" ? null : dayjs(nightSelected.end)}
                      format="DD/MM/YYYY"
                      sx={{width: '100%'}}
                      label="Date de départ"
                      minDate={dayjs(nightSelected.start) > dayjs(new Date()) ? dayjs(nightSelected.start).add(1, 'day') : dayjs(new Date()).add(1, 'day')}
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
               Who : {numberOfPeopleSelected.adult} {numberOfPeopleSelected.adult > 1 ? "peoples" : "people"} {/*<EscalatorWarningRoundedIcon sx={{margin: "0 3px"}}/> {numberOfPeopleSelected.children} */}
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
            <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, adult: prev.adult-1}))} disabled={numberOfPeopleSelected.adult === 1}><RemoveRoundedIcon sx={{color: numberOfPeopleSelected.adult === 1 ? "grey" : "#ed6c0280" }}/></Button>
            <Button disabled>{numberOfPeopleSelected.adult}</Button>
            <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, adult: prev.adult+1}))}><AddRoundedIcon sx={{color: "#ed6c0280"}}/></Button>

            {/* <MenuItem>
              How many children :
            </MenuItem>
            <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, children: prev.children-1}))} disabled={numberOfPeopleSelected.children <= 0}><RemoveRoundedIcon sx={{color: "#ed6c0280"}}/></Button>
            <Button disabled>{numberOfPeopleSelected.children}</Button>
            <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, children: prev.children+1}))}><AddRoundedIcon sx={{color: "#ed6c0280"}}/></Button> */}
          </Menu>

          {/* <Button
            onClick={submit}
            sx={{backgroundColor: "#ed6c0280", borderRadius: "0 10px 10px 0"}}
            disabled={nightSelected.start === "" || nightSelected.end === "" || numberOfPeopleSelected.adult === 0} //where 
          >
            Search
          </Button> */}

        </div>

        <RightMenu/>
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