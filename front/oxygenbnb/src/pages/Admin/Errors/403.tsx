import styles from "./Styles.module.scss"

const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <h1>403 Unauthorized</h1>
    </div>
  )
}

export default Unauthorized;