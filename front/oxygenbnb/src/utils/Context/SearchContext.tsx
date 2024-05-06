import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext(undefined);

export const SearchContextProvider = ({ children }) => {
  const [citySelected, setCitySelected] = useState(
    JSON.parse(localStorage.getItem("citySelected")) || {}
  );
  const [numberOfPeopleSelected, setNumberOfPeopleSelected] = useState<{
    adult: number;
    children: number;
  }>(
    JSON.parse(localStorage.getItem("numberOfPeopleSelected")) || {
      adult: 1,
      children: 0,
    }
  );
  const [numberOfNightSelected, setNumberOfNightSelected] = useState<number>(
    JSON.parse(localStorage.getItem("numberOfNightSelected")) || 1
  );
  const [nightSelected, setNightSelected] = useState<{
    start: string;
    end: string;
  }>(
    JSON.parse(localStorage.getItem("nightSelected")) || {
      start: dayjs(new Date()).toString(),
      end: dayjs(new Date()).add(1, "day").toString(),
    }
  );

  const compareItem = (item, strItem, func) => {
    if (localStorage.getItem(strItem) !== JSON.stringify(item)) {
      localStorage.setItem(strItem, JSON.stringify(item));
      localStorage.setItem(strItem + "MaxDate", JSON.stringify(new Date(new Date().setDate(new Date().getDate()+1))));
    }
    else {
      const maxDate = dayjs(JSON.parse(localStorage.getItem(strItem + "MaxDate")))
      const now = dayjs(new Date())
      const dateDiff = maxDate.diff(now);
      if(dateDiff < 0){
        const obj = {
          start: dayjs(new Date()).toString(),
          end: dayjs(new Date()).add(1, "day").toString(),
        }
        func(obj)
        localStorage.setItem(strItem, JSON.stringify(obj));
        localStorage.setItem(strItem + "MaxDate", JSON.stringify(new Date()));
      }
    }
  };

  useEffect(() => {
    compareItem(citySelected, "citySelected", setCitySelected);
  }, [citySelected]);
  
  useEffect(() => {
    compareItem(numberOfPeopleSelected, "numberOfPeopleSelected", setNumberOfPeopleSelected);
  }, [numberOfPeopleSelected]);

  useEffect(() => {
    compareItem(numberOfNightSelected, "numberOfNightSelected", setNumberOfNightSelected);
  }, [numberOfNightSelected]);

  useEffect(() => {
    compareItem(nightSelected, "nightSelected", setNightSelected)
  }, [nightSelected]);

  return (
    <SearchContext.Provider
      value={{
        citySelected,
        setCitySelected,
        numberOfPeopleSelected,
        setNumberOfPeopleSelected,
        numberOfNightSelected,
        setNumberOfNightSelected,
        nightSelected,
        setNightSelected,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
