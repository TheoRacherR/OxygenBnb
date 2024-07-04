import { useContext, useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import Button from "@mui/joy/Button";
import { useTranslation } from "react-i18next";
import Divider from "../Divider";
import DividerNoMargin from "../DividerNoMargin";
import axios from "axios";
import { getUserInfos } from "@utils/utils";
import { UserDataInterface } from "@pages/Admin/MainBoard/Renter/Messages/Discussion/Discussion";
import { useNavigate } from "react-router-dom";

const TotalPrice = ({
  details,
  renter_id
}: {
  details: {
    id: number;
    title: string;
    currency: string;
    nb_night: number;
    price_per_night: number;
    cleaning_fees: number;
    service_fees: number;
    taxes: number;
  },
  renter_id: number
}) => {
  const { t } = useTranslation(["site"]);
  const navigate = useNavigate();
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
  const [userInfos, setUserInfos] = useState<UserDataInterface>()


  const usr = async () => {
    const infos = await getUserInfos();
    setUserInfos(infos);
  }

  const handleCreateConversation = async () => {
    const new_conv = await axios.post(`/conversation`, {
      client: userInfos.id,
      renter: renter_id,
      rental: details.id,
    })
    if(new_conv.status === 201) {
      console.log(new_conv)
      return navigate(`/o/room/${details.id}/conversation/${new_conv.data.id}`)
    }
  }

  useEffect(() => {
    usr();
  }, [])

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
            {details.currency?.substring(0, 1)} x {details.nb_night}{" "}
            {t("site:main.room.reserve.blocks.total_price_tsx.night")}
            {details.nb_night > 1 ? "s" : ""}
          </div>
          <div className={styles.price}>
            {details.price_per_night * details.nb_night}
            {details.currency?.substring(0, 1)}
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
                  {details.currency?.substring(0, 1)}
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
          {details.currency?.substring(0, 1)}
        </div>
      </div>

      <Divider />

      <Button color="success" variant="solid" onClick={handleCreateConversation}>
        {t("site:main.room.reserve.blocks.total_price_tsx.contact_renter")}
      </Button>
    </div>
  );
};

export default TotalPrice;
