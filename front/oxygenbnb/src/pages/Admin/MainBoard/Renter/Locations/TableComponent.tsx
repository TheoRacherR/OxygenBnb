import React from "react";
import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const TableComponent = ({ data }) => {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "10px",
        padding: "10px",
        maxWidth: "100%",
        overflow: "auto",
        maxHeight: "100%",
      }}
    >
      <Table sx={{ borderRadius: 20 }}>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Name</th>
            <th>Country</th>
            <th>Fat&nbsp;(g)</th>
            <th>Carbs&nbsp;(g)</th>
            <th>Protein&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.calories}</td>
              <td>{item.fat}</td>
              <td>{item.carbs}</td>
              <td>
                <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                  <Link to="/admin/renter/location/1">
                    <Button color="primary">
                      <ArrowForwardIosRoundedIcon fontSize="small"/>
                    </Button>
                  </Link>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default TableComponent;
