import i18next from "i18next";

//Import English files
import English_Admin from "../languages/English/admin.json";
import English_Auth from "../languages/English/auth.json";
import English_Errors from "../languages/English/error.json";
import English_Site from "../languages/English/site.json";

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      admin_admin: typeof English_Admin,
      auth: typeof English_Auth,
      errors: typeof English_Errors,
      site: typeof English_Site,
    },
  }
}

export default i18next;