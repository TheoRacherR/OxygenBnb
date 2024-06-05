import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import English files
import English_Admin from "./languages/English/admin.json";
import English_Auth from "./languages/English/auth.json";
import English_Errors from "./languages/English/error.json";
import English_Site from "./languages/English/site.json";


//Import French files
import French_Admin from "./languages/French/admin.json";
import French_Auth from "./languages/French/auth.json";
import French_Errors from "./languages/French/error.json";
import French_Site from "./languages/French/site.json";


//---Using different namespaces
const resources = {
    en: {
      admin: English_Admin,
      auth: English_Auth,
      errors: English_Errors,

      site: English_Site,
    },
    fr: {
      admin: French_Admin,
      auth: French_Auth,
      errors: French_Errors,
      site: French_Site,
      
      // site_home: French_Site_home,
      // site_default: French_Site_default,
      // site_main: French_Site_main,
    },
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng: localStorage.getItem('lng') || "en", //default language
});

export default i18next;