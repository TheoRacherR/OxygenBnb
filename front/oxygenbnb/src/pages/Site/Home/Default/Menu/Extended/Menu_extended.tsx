import styles from "./Menu_extended.module.scss";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Menu_extended = () => {
  const items: {title: string, path: string, items: {name: string, path: string}[]}[] = [
    {
      title: "Par catégories",
      path: "/categ",
      items:[
        {name: "Un, Uno", path: "/un"},
        {name: "Deux, Dos", path: "/deux"},
        {name: "Trois, Très", path: "/trois"}
      ]
    },
    {
      title: "Par catégories 2",
      path: "/categ2",
      items:[
        {name: "Un, Uno", path: "/un"},
        {name: "Deux, Dos", path: "/deux"},
        {name: "Trois, Très", path: "/trois"}
      ]
    },
  ]
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <Accordion key={index} disabled={item.items.length === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {/* <Link to={item.path}> */}
              {item.title}
            {/* </Link> */}
          </AccordionSummary>
          {item.items.map((itemOfItems, indexOfItems) => (
            <AccordionDetails key={index+indexOfItems}>
              <Link to={itemOfItems.path}>
                {itemOfItems.name}
              </Link>
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </div>
  )
}

export default Menu_extended