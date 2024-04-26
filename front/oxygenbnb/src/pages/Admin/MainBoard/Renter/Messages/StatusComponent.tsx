import styles from './StatusComponent.module.scss'

const StatusComponent = ({color}) => {
  return (
    <div className={styles.container} style={{backgroundColor: color || 'green'}}></div>
  )
}

export default StatusComponent