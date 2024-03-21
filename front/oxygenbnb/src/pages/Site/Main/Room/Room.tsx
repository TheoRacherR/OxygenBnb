import { useParams } from 'react-router-dom';
import styles from './Room.module.scss'
import { Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useContext, useState } from 'react';
import { SearchContext } from '../../../../utils/Context/SearchContext';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Room = () => {
  const { id } = useParams();
  const { 
    numberOfPeopleSelected, setNumberOfPeopleSelected,
    numberOfNightSelected,
    nightSelected, setNightSelected

  } = useContext(SearchContext)
  const [anchor, setAnchor] = useState<{date_start: null | HTMLElement, date_end: null | HTMLElement, people: null | HTMLElement}>({date_start: null, date_end: null, people: null})

  const thisPrice = 35;
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

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <h1>Room {id}</h1>
        <div className={styles.box}>
          
          <div className={styles.left}>
            <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720" alt="" />
            <div className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nulla impedit harum est neque minima quaerat eos dolore deserunt natus tempora omnis inventore illum totam modi, quisquam praesentium, veniam perspiciatis.</div>
          </div>

          <div className={styles.right}>
            <div className={styles.sector_top}>
              <div className={styles.price}><span style={{fontSize:30}}>{thisPrice} €</span> par nuit</div>

              <div className={styles.dates} id='dates'>
                <div className={styles.dtop}>
                  
                  <div className={styles.dleft} onClick={e => setAnchor({date_start: e.currentTarget, date_end: null, people: null})}>
                    <div className={styles.ltop}>
                      Date d'arrivée
                    </div>
                    <div className={styles.lbottom}>
                      {dayjs(nightSelected.start).format('MMMM DD, YYYY')}
                    </div>
                  </div>

                  <div className={styles.dright} id="dateRight" onClick={e => setAnchor({date_start: null, date_end: e.currentTarget, people: null})}>
                    <div className={styles.rtop}>
                      Date de départ
                    </div>
                    <div className={styles.rbottom}>
                      {dayjs(nightSelected.end).format('MMMM DD, YYYY')}
                    </div>
                  </div>

                  <Menu
                    anchorEl={anchor.date_start}
                    open={Boolean(anchor.date_start)}
                    onClose={() => setAnchor({date_start: null, date_end: null, people: null})}
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
                    </MenuItem>
                  </Menu>

                  <Menu
                    anchorEl={anchor.date_end}
                    open={Boolean(anchor.date_end)}
                    onClose={() => setAnchor({date_start: null, date_end: null, people: null})}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem>
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
                    </MenuItem>
                  </Menu>
                </div>
                <div className={styles.dbottom}>
                  <div className={styles.ctnt} onClick={e => setAnchor({date_start: null, date_end: null, people: e.currentTarget})}>
                    <div className={styles.ctop}>
                      Nombre de voyageurs
                    </div>
                    <div className={styles.cbottom}>
                      {numberOfPeopleSelected.adult} Adult{numberOfPeopleSelected.adult > 1 ? "s" : ""}
                    </div>
                  </div>
                  <Menu
                    anchorEl={anchor.people}
                    open={Boolean(anchor.people)}
                    onClose={() => setAnchor({date_start: null, date_end: null, people: null})}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem>
                      How many adults :
                    </MenuItem>
                    <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, adult: prev.adult-1}))} disabled={numberOfPeopleSelected.adult <= 0}><RemoveRoundedIcon sx={{color: "#ed6c0280"}}/></Button>
                    <Button disabled>{numberOfPeopleSelected.adult}</Button>
                    <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, adult: prev.adult+1}))}><AddRoundedIcon sx={{color: "#ed6c0280"}}/></Button>

                    {/* <MenuItem>
                      How many children :
                    </MenuItem>
                    <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, children: prev.children-1}))} disabled={numberOfPeopleSelected.children <= 0}><RemoveRoundedIcon sx={{color: "#ed6c0280"}}/></Button>
                    <Button disabled>{numberOfPeopleSelected.children}</Button>
                    <Button onClick={() => setNumberOfPeopleSelected(prev => ({...prev, children: prev.children+1}))}><AddRoundedIcon sx={{color: "#ed6c0280"}}/></Button> */}
                  </Menu>
                </div>
              </div>

              <div className={styles.submit_button}>
                <Button variant='contained' color='warning' sx={{width: "100%", margin: "20px 0"}}>Reserve</Button>
              </div>
            </div>
  
            <div className={styles.sector_bot}>
              <div className={styles.recapitulation}>
                <div className={styles.listing}>
                  <div className={styles.litem}>
                    <div className={styles.linfos}>{thisPrice} € x {numberOfNightSelected} nuits</div>
                    <div className={styles.lnumber}>{thisPrice * numberOfNightSelected} €</div>
                  </div>
                  <div className={styles.litem}>
                    <div className={styles.linfos}>Frais d'OxygenBNB</div>
                    <div className={styles.lnumber}>13 €</div>
                  </div>
                </div>
                <div className={styles.total}>
                  <div className={styles.titem}>
                    <div className={styles.tinfos}>Frais d'OxygenBNB</div>
                    <div className={styles.tnumber}>{(thisPrice * numberOfNightSelected) + 13} €</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Room