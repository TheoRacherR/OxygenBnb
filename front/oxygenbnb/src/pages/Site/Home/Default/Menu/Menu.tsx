import styles from "./Menu.module.scss";
import logo from "../../../../../assets/Logo OxygenBNB.png";
import { Link } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useTranslation } from "react-i18next";

import RightMenu from "../../../Default/MenuSearch/RightMenu/RightMenu";

const MenuComponent = () => {
  const { t } = useTranslation(["site"]);

  return (
    <>
      <menu className={styles.container}>
        <div className={styles.menu_display_off_container}>
          <div
            className={styles.burger_container}
          >
            <MenuRoundedIcon sx={{ color: "#1E1E1E" }} fontSize="large" />
          </div>

          <div className={styles.logo}>
            <Link to="/">
              <img
                src={logo}
                alt={t(
                  "site:home.default.menu_tsx.container.menu_display_off_container.logo.alt_img"
                )}
              />
            </Link>
          </div>

          <div className={styles.account_logo}>
            <RightMenu />
          </div>
        </div>
      </menu>
    </>
  );
};

export default MenuComponent;
