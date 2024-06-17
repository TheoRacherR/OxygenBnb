import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const FormAddLocationContext = createContext(undefined);

export const FormAddLocationContextProvider = ({ children }) => {
  const { t } = useTranslation(["site"]);
  const locationType = [
    {
      name: t('site:main.renter.add_location.form_tsx.locationType.house'),
      value: "House"
    },
    {
      name: t('site:main.renter.add_location.form_tsx.locationType.pool'),
      value: "Pool"
    },
    {
      name: t('site:main.renter.add_location.form_tsx.locationType.exotic'),
      value: "Exotic"
    }
  ];

  const enumCurrency = [
    "€ (euro)",
    "£ (pound)",
    "$ (us dollar)",
    "¥ (japan yen)",
    "Ұ (china yuan)",
    "₩ (south-korean won)",
  ];

  interface LocationInformations {
    title: string;
    description: string;
    price: number;
    type: string;
    default_currency: string;
    localisation_infos: string;
    nb_person: number;
    nb_bed: number;
    nb_room: number;
    active: boolean;
  }

  const defaultData: LocationInformations = {
    title: "",
    description: "",
    price: 0,
    type: locationType[0].value,
    default_currency: enumCurrency[0],
    localisation_infos: "{}",
    nb_person: 1,
    nb_bed: 1,
    nb_room: 1,
    active: true,
  };

  const [locationInformations, setLocationInformations] =
    useState<LocationInformations>(defaultData);

  const resetData = () => {
    setLocationInformations(defaultData);
  };

  const [state, setState] = useState("Form");

  return (
    <FormAddLocationContext.Provider
      value={{
        locationInformations,
        setLocationInformations,
        locationType,
        enumCurrency,
        state,
        setState,
        resetData,
      }}
    >
      {children}
    </FormAddLocationContext.Provider>
  );
};
