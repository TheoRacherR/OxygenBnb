import styles from "./Pods.module.scss";

const Pods = ({ title, value }) => {
  return (
    <div
      className={styles.container}
    >
      <h1 className={styles.h1}>{value?.toString()}</h1>
      <p className={styles.p}>{title}</p>
    </div>
  );
};

export default Pods;
