import { useContext, useState } from "react";
import styles from "./Styles.module.scss";
import Button from "@mui/joy/Button";
import { useTranslation } from "react-i18next";
import Divider from "../Divider";
import DividerNoMargin from "../DividerNoMargin";

const TotalPrice = ({
  details,
}: {
  details: {
    title: string;
    currency: string;
    nb_night: number;
    price_per_night: number;
    cleaning_fees: number;
    service_fees: number;
    taxes: number;
  };
}) => {
  const { t } = useTranslation(["site"]);
  const priceDetails = [
    {
      title: t("site:main.room.reserve.blocks.total_price_tsx.cleaning_fees"),
      price: details.cleaning_fees,
    },
    {
      title: t("site:main.room.reserve.blocks.total_price_tsx.service_fees"),
      price: details.service_fees,
    },
    {
      title: t("site:main.room.reserve.blocks.total_price_tsx.taxes"),
      price: details.taxes,
    },
  ];

  return (
    <div className={styles.container_total_price}>
      <div className={styles.description}>
        <div className={styles.title}>{details.title}</div>
      </div>

      <DividerNoMargin />

      <div className={styles.price_details}>
        <h3>{t("site:main.room.reserve.blocks.total_price_tsx.title")}</h3>
        <div className={styles.line}>
          <div className={styles.title}>
            {details.price_per_night}
            {details.currency.substring(0, 1)} x {details.nb_night}{" "}
            {t("site:main.room.reserve.blocks.total_price_tsx.night")}
            {details.nb_night > 1 ? "s" : ""}
          </div>
          <div className={styles.price}>
            {details.price_per_night * details.nb_night}
            {details.currency.substring(0, 1)}
          </div>
        </div>
        {priceDetails.map((item, index) => (
          <div key={index}>
            {item.price === 0 ? (
              <></>
            ) : (
              <div className={styles.line}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.price}>
                  {item.price}
                  {details.currency.substring(0, 1)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Divider />

      <div className={styles.total}>
        <div>{t("site:main.room.reserve.blocks.total_price_tsx.total")}</div>
        <div>
          {details.price_per_night * details.nb_night +
            (+priceDetails[0].price +
              priceDetails[1].price +
              priceDetails[2].price)}
          {details.currency.substring(0, 1)}
        </div>
      </div>

      <Divider />

      <Button color="success" variant="solid">
        {t("site:main.room.reserve.blocks.total_price_tsx.submit")}
      </Button>
    </div>
  );
};

export default TotalPrice;
