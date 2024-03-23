import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext(undefined)

export const SearchContextProvider = ({children}) => {
    const [citySelected, setCitySelected] = useState(
      JSON.parse(localStorage.getItem("citySelected")) || {}
    );
    const [numberOfPeopleSelected, setNumberOfPeopleSelected] = useState<{adult: number, children: number}>(
      JSON.parse(localStorage.getItem("numberOfPeopleSelected")) || {adult: 1, children: 0}
    );
    const [numberOfNightSelected, setNumberOfNightSelected] = useState<number>(
      JSON.parse(localStorage.getItem("numberOfNightSelected")) || 1
    );
    const [nightSelected, setNightSelected] = useState<{start: string, end: string}>(
      JSON.parse(localStorage.getItem("nightSelected")) || {start: dayjs(new Date()).toString(), end: dayjs(new Date()).add(1, 'day').toString()}
    );
    
    useEffect(() => {
      if(JSON.parse(localStorage.getItem("citySelected")) !== citySelected) {
        localStorage.setItem("citySelected", JSON.stringify(citySelected))
      }
    }, [citySelected])

    useEffect(() => {
      if(JSON.parse(localStorage.getItem("numberOfPeopleSelected")) !== numberOfPeopleSelected) {
        localStorage.setItem("numberOfPeopleSelected", JSON.stringify(numberOfPeopleSelected))
      }
    }, [numberOfPeopleSelected])

    useEffect(() => {
      if(JSON.parse(localStorage.getItem("numberOfNightSelected")) !== numberOfNightSelected) {
        localStorage.setItem("numberOfNightSelected", JSON.stringify(numberOfNightSelected))
      }
    }, [numberOfNightSelected])

    useEffect(() => {
      if(JSON.parse(localStorage.getItem("nightSelected")) !== nightSelected) {
        localStorage.setItem("nightSelected", JSON.stringify(nightSelected))
      }
    }, [nightSelected])

    return (
      <SearchContext.Provider value={{
        citySelected, setCitySelected, 
        numberOfPeopleSelected, setNumberOfPeopleSelected,
        numberOfNightSelected, setNumberOfNightSelected,
        nightSelected, setNightSelected,
      }}>
        {children}
      </SearchContext.Provider>
    );
}