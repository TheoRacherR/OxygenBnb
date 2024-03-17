import { Button } from "@mui/material"
import styles from "./ItemSearch.module.scss"
import { Link } from "react-router-dom"

const ItemSearch = ({item, numberOfNight}
  // {type, city, title, bed, owner, pricePerNight, numberOfNight}
) => {
  return (
    <div className={styles.container}>
      <Link to={`/o/room/${item.id}`} style={{textDecoration: "none", color: "white"}}>
        <div className={styles.image} style={{background: "url(https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720)"}}>
          <div className={styles.listOfImg}>
            {/* <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720" alt="" /> */}
          </div>
        </div>
        {/* <h2>Title</h2> */}
        <div className={styles.desc}>{item.name}</div>
        <div className={styles.beds}>{item.numberOfPeopleMax} beds</div>
        <div className={styles.owner}>By {item.owner}</div>
        <div className={styles.price}>{item.pricePerNight}/night {item.pricePerNight ?? `, so a total of ${parseInt(numberOfNight) * parseInt(item.pricePerNight)}`}</div>
      </Link>
    </div>
  )
}

export default ItemSearch