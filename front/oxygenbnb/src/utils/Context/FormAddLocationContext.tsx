import { createContext, useState } from "react";

export const FormAddLocationContext = createContext(undefined)



export const FormAddLocationContextProvider = ({children}) => {
  const locationType = ["Hostel", "Pool", "Penthouse"];

  const enumCurrency = [
    "€ (euro)",
    "£ (pound)",
    "$ (us dollar)",
    "¥ (japan yen)",
    "Ұ (china yuan)",
    "₩ (south-korean won)",
  ];

  const [locationInformations, setLocationInformations] = useState<{
    title: string,
    description: string,
    price: number,
    type: string,
    default_currency: string,
    nb_person: number,
    nb_bed: number,
    nb_room: number,
    active: boolean,
  }>({
    title: "",
    description: "",
    price: 0,
    type: locationType[0],
    default_currency: enumCurrency[0],
    nb_person: 1,
    nb_bed: 1,
    nb_room: 1,
    active: true,
  });

  const [state, setState] = useState("Form");

  return (
    <FormAddLocationContext.Provider value={{locationInformations, setLocationInformations, locationType, enumCurrency, state, setState}}>
      {children}
    </FormAddLocationContext.Provider>
  );
}