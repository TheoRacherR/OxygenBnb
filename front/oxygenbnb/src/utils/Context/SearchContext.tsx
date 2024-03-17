import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext(undefined)

export const SearchContextProvider = ({children}) => {
    const [citySelected, setCitySelected] = useState({});
    const [numberOfPeopleSelected, setNumberOfPeopleSelected] = useState({});
    const [numberOfNightSelected, setNumberOfNightSelected] = useState({});
    useEffect(() => {
      console.log(citySelected)
    }, [citySelected])
    
    return (
      <SearchContext.Provider value={{
        citySelected, setCitySelected, 
        numberOfPeopleSelected, setNumberOfPeopleSelected,
        numberOfNightSelected, setNumberOfNightSelected,
      }}>
        {children}
      </SearchContext.Provider>
    );
}