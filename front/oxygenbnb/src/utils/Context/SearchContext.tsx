import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext(undefined)

export const SearchContextProvider = ({children}) => {
    const [citySelected, setCitySelected] = useState({});
    const [numberOfPeopleSelected, setNumberOfPeopleSelected] = useState<{adult: number, children: number}>({adult: 1, children: 0});
    const [numberOfNightSelected, setNumberOfNightSelected] = useState<number>(1);
    const [nightSelected, setNightSelected] = useState<{start: string, end: string}>({start: dayjs(new Date()).toString(), end: dayjs(new Date()).add(1, 'day').toString()});
    useEffect(() => {
      // console.log(nightSelected.start)
    }, [nightSelected.start])
    
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