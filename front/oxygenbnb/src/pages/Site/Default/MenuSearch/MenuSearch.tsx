import styles from "./MenuSearch.module.scss";
import logo from "../../../../assets/Logo OxBNB Menu ow Honr.png"
import { Link } from "react-router-dom";
import RightMenuSearch from "./RightMenu/RightMenuSearch";

import { useTranslation } from "react-i18next";
import MiddleExtended from "./MiddleExtended/MiddleExtended";

const MenuComponent = () => {
  const { t } = useTranslation(['site_default']);

  return (
    <>
      <menu className={styles.container}>
        <div className={styles.left}>
          <Link to="/">
            <img 
              src={logo}
              alt={t(
                "site_default:default.menu.menu_tsx.container.left.alt_img"
              )} 
            />
          </Link>
        </div>
        <MiddleExtended/>
        <RightMenuSearch/>
      </menu>
    </>
  );
};

export default MenuComponent