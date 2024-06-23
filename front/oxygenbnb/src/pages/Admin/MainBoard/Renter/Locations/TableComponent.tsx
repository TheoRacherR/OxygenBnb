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
  const { t } = useTranslation(["admin"]);

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
      {data.length === 0 ? (
        <div style={{ color: "white" }}>
          {t("admin:renter.locations.table_component_tsx.no_location")}
        </div>
      ) : (
        <Table sx={{ borderRadius: 20, color: "#fff" }}>
          <thead>
            <tr>
              <th style={{ color: "#fff" }}>
                {t("admin:renter.locations.table_component_tsx.thead.id")}
              </th>
              <th style={{ color: "#fff" }}>
                {t("admin:renter.locations.table_component_tsx.thead.title")}
              </th>
              <th style={{ color: "#fff" }}>
                {t("admin:renter.locations.table_component_tsx.thead.price")}
              </th>
              <th style={{ color: "#fff" }}>
                {t(
                  "admin:renter.locations.table_component_tsx.thead.activated"
                )}
              </th>
              <th style={{ color: "#fff" }}>
                {t(
                  "admin:renter.locations.table_component_tsx.thead.validated"
                )}
              </th>
              {/* id, title, prix, type, validé */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.default_price}</td>
                <td>
                  {item.active ? (
                    <CheckCircleOutlineRoundedIcon color="success" />
                  ) : (
                    <HighlightOffRoundedIcon sx={{ color: red[500] }} />
                  )}
                </td>
                <td>
                  {item.isValid ? (
                    <CheckCircleOutlineRoundedIcon color="success" />
                  ) : (
                    <HighlightOffRoundedIcon sx={{ color: red[500] }} />
                  )}
                </td>
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
      )}
    </Sheet>
  );
};

export default TableComponent;
