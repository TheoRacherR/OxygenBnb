import i18next from "i18next";

//Import English files
import English_Admin_default from "../languages/English/Admin/default.json";
import English_Admin_renter from "../languages/English/Admin/renter.json";
import English_Admin_admin from "../languages/English/Admin/admin.json";

import English_Auth from "../languages/English/Auth/translation.json";
import English_Errors from "../languages/English/Errors/translation.json";

import English_Site_home from "../languages/English/Site/home.json";
import English_Site_main from "../languages/English/Site/main.json";
import English_Site_default from "../languages/English/Site/default.json";


declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      admin_default: typeof English_Admin_default,
      admin_renter: typeof English_Admin_renter,
      admin_admin: typeof English_Admin_admin,

      auth: typeof English_Auth,
      errors: typeof English_Errors,

      site_home: typeof English_Site_home,
      site_default: typeof English_Site_default,
      site_main: typeof English_Site_main,
    },
  }
}

export default i18next;