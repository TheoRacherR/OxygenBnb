import { useState } from "react";
import styles from "./Styles.module.scss"
import Radio from '@mui/joy/Radio';
import { useTranslation } from "react-i18next";

const choices = [
  "Test",
  "Yep",
  "Nope"
]

const Payments = () => {
  const { t } = useTranslation("site_main")
  const [selectedValue, setSelectedValue] = useState(choices[0]);

  const handleChangeRatio = (item: string) => {
    setSelectedValue(item);
  };
  return (
    <div className={styles.container_payments}>
      {/* {t("site_main:main.room.reserve")} */}
      <h2>{t("site_main:main.room.reserve.blocks.payments_tsx.title")}</h2>
      <div className={styles.choice}>
        {
          choices.map((item, index) => (
            // style={{backgroundColor: "#00000019"}}
            <div
              className={styles.item}
              id={selectedValue === item ? styles.item_selected : styles.item_not_selected}
              key={index}
              onClick={() => handleChangeRatio(item)}
            >
              <div>{item}</div>
              <Radio
                checked={selectedValue === item}
                onChange={() => handleChangeRatio(item)}
                value={item}
                // slotProps={{ input: { 'aria-label': item } }}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Payments