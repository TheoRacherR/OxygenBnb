import styles from "./Menu.module.scss";
import logo from "@assets/Logo OxBNB Menu ob Honr.png";
import { Link } from "react-router-dom";
import RightMenu from "../MenuSearch/RightMenu/RightMenu";
import { useTranslation } from "react-i18next";

const MenuComponent = () => {
  const { t } = useTranslation(["site"]);

  return (
    <>
      <menu className={styles.container}>
        <div className={styles.left}>
          <Link to="/">
            <img
              src={logo}
              alt={t("site:default.menu.menu_tsx.container.left.alt_img")}
            />
          </Link>
        </div>
        <RightMenu />
      </menu>
    </>
  );
};

export default MenuComponent;
