import styles from "./Pods.module.scss";
import { useState } from "react";

const Pods = ({ title, value }) => {
  return (
    <div
      className={styles.container}
    >
      <h1 className={styles.h1}>{value}</h1>
      <p className={styles.p}>{title}</p>
    </div>
  );
};

export default Pods;
