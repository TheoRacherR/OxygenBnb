import styles from "./Chart.module.scss";
import { useState } from "react";

const Chart = ({ title, values }) => {
  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <div className={styles.content}></div>
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Chart;
