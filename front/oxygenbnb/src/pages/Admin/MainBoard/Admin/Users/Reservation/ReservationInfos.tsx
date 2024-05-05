import dayjs from "dayjs";
import styles from "./ReservationPage.module.scss";
import Input from "@mui/joy/Input";

const reservationData = {
  id: 2,
  reservation_date: new Date("08-20-2023"),
  start_date: new Date("08-10-2024"),
  end_date: new Date("08-17-2024"),
  price_per_night: 300,
  currency: "$ (US Dollar)",
  number_of_nights: 7,
  number_of_person: 8,
};

const ReservationInfos = ({ reservation_id }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Reservation infos</div>
      <div className={styles.list_container}>
        <div className={styles.item}>
          <Input
            variant="outlined"
            value={reservation_id}
            startDecorator={<label>ID</label>}
            disabled
          />
        </div>
        <div className={styles.item}>
          <Input
            variant="outlined"
            value={reservationData.number_of_nights}
            startDecorator={<label>Number of nights</label>}
            disabled
          />
        </div>
        <div className={styles.item}>
          <Input
            variant="outlined"
            value={dayjs(reservationData.reservation_date).format("DD/MM/YYYY")}
            startDecorator={<label>Reservation date</label>}
            disabled
          />
        </div>
        <div className={styles.item}>
          <Input
            variant="outlined"
            value={dayjs(reservationData.start_date).format("DD/MM/YYYY")}
            startDecorator={<label>From</label>}
            disabled
          />
        </div>
        <div className={styles.item}>
          <Input
            variant="outlined"
            value={dayjs(reservationData.end_date).format("DD/MM/YYYY")}
            startDecorator={<label>To</label>}
            disabled
          />
        </div>
        <div className={styles.item}>
          <Input
            variant="outlined"
            value={
              reservationData.price_per_night *
                reservationData.number_of_nights +
              " " +
              reservationData.currency.substring(0, 1)
            }
            startDecorator={<label>Total price</label>}
            disabled
          />
        </div>
        <div className={styles.item}>
          <Input
            variant="outlined"
            value={reservationData.number_of_person}
            startDecorator={<label>Number of person</label>}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationInfos;
