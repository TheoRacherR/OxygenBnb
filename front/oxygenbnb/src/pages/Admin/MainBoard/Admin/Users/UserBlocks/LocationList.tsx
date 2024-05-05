import React from 'react'
import styles from "./Styles.module.scss"
import Input from "@mui/joy/Input";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputComponent from "./InputComponent";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";


const dataTemp: {
  title: string,
  id: number,
  price: number,
  validated: boolean
}[] = [
  {
    title: "Frozen yoghurt",
    id: 159,
    price: 6,
    validated: true
  },
  {
    title: "Ice cream sandwich",
    id: 237,
    price: 9,
    validated: false
  },
  {
    title: "Eclair",
    id: 262,
    price: 16,
    validated: true
  },
  {
    title: "Cupcake",
    id: 305,
    price: 3.7,
    validated: true
  },
  {
    title: "Gingerbread",
    id: 356,
    price: 16,
    validated: true
  }
]

const LocationList = ({id}) => {
  const { t } = useTranslation(["admin_admin"]);

  return (
    <Accordion sx={{backgroundColor: "#0A0E0F"}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #32383e",
          borderRadius: "10px",
        }}
      >
        <AssignmentRoundedIcon/>&nbsp;Locations for user {id}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.main_list}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "10px",
              padding: "10px",
              maxWidth: "100%",
              overflow: "auto",
              maxHeight: "100%",
              backgroundColor: "#0A0E0F",
              borderColor: "grey",
            }}
          >
            <Table sx={{ borderRadius: 20, color: "#fff" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Price per night</th>
                  <th>Validated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataTemp.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{
                      item.validated ? 
                        <CheckCircleOutlineRoundedIcon color="success" />
                      : 
                        <HighlightOffRoundedIcon sx={{ color: red[500] }} />}</td>
                    <td>
                      <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                        <Link to={`/admin/location/${item.id}`}>
                          <Button color="primary">
                            <ArrowForwardIosRoundedIcon fontSize="small" />
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default LocationList