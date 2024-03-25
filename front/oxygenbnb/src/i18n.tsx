import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import English files
import English_Admin_default from "./languages/English/Admin/default.json";
import English_Admin_renter from "./languages/English/Admin/renter.json";
import English_Admin_admin from "./languages/English/Admin/admin.json";

import English_Auth from "./languages/English/Auth/translation.json";
import English_Errors from "./languages/English/Errors/translation.json";

import English_Site_home from "./languages/English/Site/home.json";
import English_Site_main from "./languages/English/Site/main.json";
import English_Site_default from "./languages/English/Site/default.json";


//Import French files
import French_Admin_default from "./languages/French/Admin/default.json";
import French_Admin_renter from "./languages/French/Admin/renter.json";
// import French_Admin_admin from "./languages/French/Admin/admin.json";

import French_Auth from "./languages/French/Auth/translation.json";
import French_Errors from "./languages/French/Errors/translation.json";

import French_Site_home from "./languages/French/Site/home.json";
import French_Site_main from "./languages/French/Site/main.json";
import French_Site_default from "./languages/French/Site/default.json";


//---Using different namespaces
const resources = {
    en: {
      admin_default: English_Admin_default,
      admin_renter: English_Admin_renter,
      admin_admin: English_Admin_admin,

      auth: English_Auth,
      errors: English_Errors,

      site_home: English_Site_home,
      site_default: English_Site_default,
      site_main: English_Site_main,
    },
    fr: {
      admin_default: French_Admin_default,
      admin_renter: French_Admin_renter,
      auth: French_Auth,
      errors: French_Errors,

      site_home: French_Site_home,
      site_default: French_Site_default,
      site_main: French_Site_main,
    },
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng: localStorage.getItem('lng') || "en", //default language
});

export default i18next;