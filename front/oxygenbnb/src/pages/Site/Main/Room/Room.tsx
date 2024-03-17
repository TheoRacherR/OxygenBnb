import { useParams } from 'react-router-dom';
import styles from './Room.module.scss'

const Room = () => {
  const { id } = useParams();
  return (
    <div className={styles.container}>Room {id}</div>
  )
}

export default Room