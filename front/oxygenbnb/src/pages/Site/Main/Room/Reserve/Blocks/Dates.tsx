import { useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import "dayjs/locale/fr";
import { Link } from "react-router-dom";

const Dates = ({
  url,
  nightSelected,
  numberOfPeopleSelected,
}: {
  url: string;
  nightSelected: {
    start: string;
    end: string;
  };
  numberOfPeopleSelected: {
    adult: number;
    children: number;
  };
}) => {
  const { t } = useTranslation(["site"]);
  const [data, setData] = useState<{
    dates: {
      content: {
        start: string;
        end: string;
      };
    };
    peoples: {
      content: {
        adult: number;
        children: number;
      };
    };
  }>({
    dates: {
      content: {
        start: dayjs(new Date()).toString(),
        end: dayjs(new Date()).add(1, "day").toString(),
      },
    },
    peoples: {
      content: {
        adult: 1,
        children: 0,
      },
    },
  });

  useEffect(() => {
    setData({
      dates: {
        content: nightSelected,
      },
      peoples: {
        content: numberOfPeopleSelected,
      },
    });
  }, []);
  return (
    <div className={styles.container_dates}>
      <h2>{t("site:main.room.reserve.blocks.dates_tsx.title")}</h2>
      <div className={styles.item}>
        <div className={styles.left}>
          <p>{t("site:main.room.reserve.blocks.dates_tsx.dates")}</p>
          <div>
            {t("site:main.room.reserve.blocks.dates_tsx.from")}{" "}
            <span style={{ fontWeight: "bold" }}>
              {dayjs(data.dates.content.start)
                .locale("fr")
                .format(
                  t(
                    "site:main.room.reserve.blocks.dates_tsx.dates_format_start"
                  )
                )}
            </span>{" "}
            {t("site:main.room.reserve.blocks.dates_tsx.to")}{" "}
            <span style={{ fontWeight: "bold" }}>
              {dayjs(data.dates.content.end)
                .locale("fr")
                .format(
                  t("site:main.room.reserve.blocks.dates_tsx.dates_format_end")
                )}
            </span>
          </div>
        </div>
        <Link
          to={`/o/${url.substring(0, url.length - 12)}`}
          style={{ color: "black" }}
        >
          <div className={styles.right}>
            {t("site:main.room.reserve.blocks.dates_tsx.edit")}
          </div>
        </Link>
      </div>
      <div className={styles.item}>
        <div className={styles.left}>
          <p>{t("site:main.room.reserve.blocks.dates_tsx.people")}</p>
          <div>
            {data.peoples.content.adult}{" "}
            {t("site:main.room.reserve.blocks.dates_tsx.adult")}
            {data.peoples.content.adult > 1 ? "s" : ""}{" "}
            {/*data.peoples.content.children*/}
          </div>
        </div>
        <Link
          to={`/o/${url.substring(0, url.length - 12)}`}
          style={{ color: "black" }}
        >
          <div className={styles.right}>
            {t("site:main.room.reserve.blocks.dates_tsx.edit")}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dates;
