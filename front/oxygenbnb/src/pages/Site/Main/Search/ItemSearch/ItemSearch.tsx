import styles from "./ItemSearch.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RentalFormatedWithLocalisations } from "../../../../../../../../back/oxygenbnb/src/tables/rental/rental.service";

const ItemSearch = ({ item, numberOfNight }: { item: RentalFormatedWithLocalisations, numberOfNight: number}) => {
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
            background: "url(https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720)"              ,
          }}
        >
          <div className={styles.listOfImg}></div>
        </div>
        <div className={styles.desc}>{item.title}</div>
        <div className={styles.beds}>
          {item.nb_max_person}{" "}
          {t("site:main.search.item_search.item_search_tsx.bed")}
        </div>
        <div className={styles.owner}>
          {t("site:main.search.item_search.item_search_tsx.by")} {item.owner.firstname}{item.owner.lastname.substring(0,1).toUpperCase()}.
        </div>
        <div className={styles.price}>
          {item.default_price}{' '}{item.default_currency.substring(0,1)}/
          {t("site:main.search.item_search.item_search_tsx.night")}{" "}
          {item.default_price ??
            `, ${t("site:main.search.item_search.item_search_tsx.total")} ${
              parseInt(numberOfNight.toString()) * parseInt(item.default_price.toString())
            }`}{' '}{item.default_currency.substring(0,1)}
        </div>
      </Link>
    </div>
  );
};

export default ItemSearch;
