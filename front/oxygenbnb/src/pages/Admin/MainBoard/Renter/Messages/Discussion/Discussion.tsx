import styles from "./Discussion.module.scss";
import MainDiscussion from "./MainDiscussion";
import TopInfoDiscussion from "./TopInfoDiscussion";

const Discussion = () => {
  return (
    <div className={styles.container}>
      <TopInfoDiscussion/>
      <MainDiscussion/>
    </div>
  );
};

export default Discussion;
