import React from "react";
import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const TableComponent = ({ data }) => {
  const { t } = useTranslation(["admin_renter"]);

  return (
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
            <th style={{ color: "#fff" }}>{t("admin_renter:renter.locations.table_component_tsx.thead.id")}</th>
            <th style={{ color: "#fff" }}>{t("admin_renter:renter.locations.table_component_tsx.thead.title")}</th>
            <th style={{ color: "#fff" }}>{t("admin_renter:renter.locations.table_component_tsx.thead.price")}</th>
            <th style={{ color: "#fff" }}>{t("admin_renter:renter.locations.table_component_tsx.thead.validated")}</th>
            {/* id, title, prix, type, validé */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
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
                  <Link to={`/admin/renter/location/${item.id}`}>
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
  );
};

export default TableComponent;
