import { Button } from "@mui/material";
import styles from "./ItemSearch.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ItemSearch = ({ item, numberOfNight }) =>
  // {type, city, title, bed, owner, pricePerNight, numberOfNight}
  {
    const { t } = useTranslation(["site"]);
    return (
      <div className={styles.container}>
        <Link
          to={`/o/room/${item.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div
            className={styles.image}
            style={{
              background: item.img,
            }}
          >
            <div className={styles.listOfImg}></div>
          </div>
          <div className={styles.desc}>{item.name}</div>
          <div className={styles.beds}>
            {item.numberOfPeopleMax}{" "}
            {t("site:main.search.item_search.item_search_tsx.bed")}
          </div>
          <div className={styles.owner}>
            {t("site:main.search.item_search.item_search_tsx.by")} {item.owner}
          </div>
          <div className={styles.price}>
            {item.pricePerNight}/
            {t("site:main.search.item_search.item_search_tsx.night")}{" "}
            {item.pricePerNight ??
              `, ${t("site:main.search.item_search.item_search_tsx.total")} ${
                parseInt(numberOfNight) * parseInt(item.pricePerNight)
              }`}
          </div>
        </Link>
      </div>
    );
  };

export default ItemSearch;
