import { Link } from 'react-router-dom';
import styles from './Footer.module.scss'
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(['site_default']);

  console.log(t("errors:403"))
  const date = new Date();
  const links1: {name: string; path: string}[] = 
  [
    {name: t("site_default:default.footer_tsx.wrapper.band_zero.zero"), path: "https://twitter.com"},
    {name: t("site_default:default.footer_tsx.wrapper.band_zero.one"), path: "https://instagram.com"},
    {name: t("site_default:default.footer_tsx.wrapper.band_zero.two"), path: "https://facebook.com"},
  ]

  const links2: {name: string; path: string}[] = 
  [
    {name: t("site_default:default.footer_tsx.wrapper.band_one.zero"), path: "/terms"},
    {name: t("site_default:default.footer_tsx.wrapper.band_one.one"), path: "/sitemap"},
    {name: t("site_default:default.footer_tsx.wrapper.band_one.two"), path: "/privacy_policy"},
  ]

  const links3: {name: string; path: string}[] = 
  [
    {name: t("site_default:default.footer_tsx.wrapper.band_two.zero"), path: "/about-us"},
    {name: t("site_default:default.footer_tsx.wrapper.band_two.one"), path: "/contact-us"},
    {name: t("site_default:default.footer_tsx.wrapper.band_two.two"), path: "/how-to-use"},
  ]

  return (
    <footer className={styles.container}>

      <div className={styles.wrapper}>
        <div className={styles.links_container}>
          <div className={styles.band}>
            {links1.map((item, index) => (
              <div key={index}>
                <Link to={item.path} key={index}>{item.name}</Link>
              </div>
            ))}
          </div>

          <div className={styles.band}>
            {links2.map((item, index) => (
              <div key={index}>
                <Link to={item.path} key={index}>{item.name}</Link>
              </div>
            ))}
          </div>

          <div className={styles.band}>
            {links3.map((item, index) => (
              <div key={index}>
                <Link to={item.path} key={index}>{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.end_logo}>© {date.getFullYear()} {t("site_default:default.footer_tsx.wrapper.end_logo")}</div>
      </div>

    </footer>
  )
}

export default Footer