import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext(undefined);

export const SearchContextProvider = ({ children }) => {
  try {JSON.parse(localStorage.getItem("citySelected"))} catch (e) {localStorage.setItem("citySelected", JSON.stringify({}))}
  try {JSON.parse(localStorage.getItem("numberOfPeopleSelected"))} catch (e) {localStorage.setItem("numberOfPeopleSelected", JSON.stringify({adult: 1,children: 0}))} 
  try {JSON.parse(localStorage.getItem("numberOfNightSelected"))} catch (e) {localStorage.setItem("numberOfNightSelected", JSON.stringify(1))}
  try {JSON.parse(localStorage.getItem("nightSelected"))} catch (e) {localStorage.setItem("nightSelected", JSON.stringify({start: dayjs(new Date()).toString(),end: dayjs(new Date()).add(1, "day").toString()}))} 

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

  const checkIfOutdated = (strItem) => {
    const maxDate = dayjs(JSON.parse(localStorage.getItem(strItem + "MaxDate")))
      const now = dayjs(new Date())
      const dateDiff = maxDate.diff(now);
      if(dateDiff < 0){
        return true;
      }
      return false
  }

  const updateCitySelected = (element) => {
    if (localStorage.getItem("citySelected") !== JSON.stringify(element)) {
      setCitySelected(element)
      localStorage.setItem("citySelected", JSON.stringify(element));
      localStorage.setItem("citySelected" + "MaxDate", JSON.stringify(new Date(new Date().setDate(new Date().getDate()+1))));
    }
    else {
      if(checkIfOutdated("citySelected")){
        const obj = {}
        setCitySelected(obj)
        localStorage.setItem("citySelected", JSON.stringify(obj));
        localStorage.setItem("citySelectedMaxDate", JSON.stringify(new Date()));
      }
    }
  }
  
  const updateNumberOfPeopleSelected = (element) => {
    if(localStorage.getItem("numberOfPeopleSelected") !== JSON.stringify(element)) {
      setNumberOfPeopleSelected(element)
      localStorage.setItem("numberOfPeopleSelected", JSON.stringify(element));
      localStorage.setItem("numberOfPeopleSelected" + "MaxDate", JSON.stringify(new Date(new Date().setDate(new Date().getDate()+1))));
    }
    else {
      if(checkIfOutdated("numberOfPeopleSelected")){
        const obj = {
          adult: 1,
          children: 0,
        }
        setNumberOfPeopleSelected(obj)
        localStorage.setItem("numberOfPeopleSelected", JSON.stringify(obj));
        localStorage.setItem("numberOfPeopleSelectedMaxDate", JSON.stringify(new Date()));
      }
    }
  }

  const updateNumberOfNightSelected = (element) => {
    if(localStorage.getItem("numberOfNightSelected") !== JSON.stringify(element)) {
      setNumberOfNightSelected(element)
      localStorage.setItem("numberOfNightSelected", JSON.stringify(element));
      localStorage.setItem("numberOfNightSelected" + "MaxDate", JSON.stringify(new Date(new Date().setDate(new Date().getDate()+1))));
    }
    else {
      if(checkIfOutdated("numberOfNightSelected")){
        const obj = 1
        setNumberOfNightSelected(obj)
        localStorage.setItem("numberOfNightSelected", JSON.stringify(obj));
        localStorage.setItem("numberOfNightSelectedMaxDate", JSON.stringify(new Date()));
      }
    }
  }

  const updateNightSelected = (element) => {
    if (localStorage.getItem("nightSelected") !== JSON.stringify(element)) {
      setNightSelected(element)
      localStorage.setItem("nightSelected", JSON.stringify(element));
      localStorage.setItem("nightSelectedMaxDate", JSON.stringify(new Date(new Date().setDate(new Date().getDate()+1))));
    }
    else {
      if(checkIfOutdated("nightSelected")){
        const obj = {
          start: dayjs(new Date()).toString(),
          end: dayjs(new Date()).add(1, "day").toString(),
        }
        setNightSelected(obj)
        localStorage.setItem("nightSelected", JSON.stringify(obj));
        localStorage.setItem("nightSelectedMaxDate", JSON.stringify(new Date()));
      }
    }
  }

  useEffect(() => {
    console.log("check")
    if(checkIfOutdated("citySelected")){
      const obj = {}
      setCitySelected(obj)
      localStorage.setItem("citySelected", JSON.stringify(obj));
      localStorage.setItem("citySelectedMaxDate", JSON.stringify(new Date()));
    }
    if(checkIfOutdated("numberOfPeopleSelected")){
      const obj = {
        adult: 1,
        children: 0,
      }
      setNumberOfPeopleSelected(obj)
      localStorage.setItem("numberOfPeopleSelected", JSON.stringify(obj));
      localStorage.setItem("numberOfPeopleSelectedMaxDate", JSON.stringify(new Date()));
    }
    if(checkIfOutdated("numberOfNightSelected")){
      const obj = 1
      setNumberOfNightSelected(obj)
      localStorage.setItem("numberOfNightSelected", JSON.stringify(obj));
      localStorage.setItem("numberOfNightSelectedMaxDate", JSON.stringify(new Date()));
    }
    if(checkIfOutdated("nightSelected")){
      const obj = {
        start: dayjs(new Date()).toString(),
        end: dayjs(new Date()).add(1, "day").toString(),
      }
      setNightSelected(obj)
      localStorage.setItem("nightSelected", JSON.stringify(obj));
      localStorage.setItem("nightSelectedMaxDate", JSON.stringify(new Date()));
    }
  }, [])

  return (
    <SearchContext.Provider
      value={{
        citySelected,
        // setCitySelected,
        updateCitySelected,
        numberOfPeopleSelected,
        // setNumberOfPeopleSelected,
        updateNumberOfPeopleSelected,
        numberOfNightSelected,
        // setNumberOfNightSelected,
        updateNumberOfNightSelected,
        nightSelected,
        // setNightSelected,
        updateNightSelected,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
