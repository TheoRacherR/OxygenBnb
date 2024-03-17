import { Link } from 'react-router-dom';
import styles from './Footer.module.scss'

const Footer = () => {
  const date = new Date();
  const links1: {name: string; path: string}[] = 
  [
    {name: "Twitter", path: "twitter.com"},
    {name: "Instagram", path: "instagram.com"},
    {name: "Facebook", path: "facebook.com"},
  ]

  const links2: {name: string; path: string}[] = 
  [
    {name: "Conditions générales", path: "/terms"},
    {name: "Plan du site", path: "/sitemap"},
    {name: "Confidentialité", path: "/privacy_policy"},
  ]

  const links3: {name: string; path: string}[] = 
  [
    {name: "Qui sommes nous ?", path: "/about-us"},
    {name: "Nous contacter", path: "/contact-us"},
    {name: "Fonctionnement du site", path: "/how-to-use"},
  ]

  return (
    <footer className={styles.container}>

      <div className={styles.wrapper}>
        <div className={styles.links_container}>
          <div className={styles.band}>
            {links1.map((item, index) => (
              <div key={"link1"+index}>
                <Link to={item.path}>{item.name}</Link>
              </div>
            ))}
          </div>

          <div className={styles.band}>
            {links2.map((item, index) => (
              <div key={"link2"+index}>
                <Link to={item.path}>{item.name}</Link>
              </div>
            ))}
          </div>

          <div className={styles.band}>
            {links3.map((item, index) => (
              <div key={"link3"+index}>
                <Link to={item.path}>{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.end_logo}>© {date.getFullYear()} OxygenBNB, Inc</div>
      </div>

    </footer>
  )
}

export default Footer