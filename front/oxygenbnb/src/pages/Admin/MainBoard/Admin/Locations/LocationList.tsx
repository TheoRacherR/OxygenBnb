import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTranslation } from "react-i18next";
import TopLevelPanel from "../../TopLevelPanel";
import styles from "./LocationList.module.scss";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { red } from "@mui/material/colors";

const dataTemp: {
  title: string;
  id: number;
  price: number;
  validated: boolean;
}[] = [
  {
    title: "Frozen yoghurt",
    id: 159,
    price: 6,
    validated: true,
  },
  {
    title: "Ice cream sandwich",
    id: 237,
    price: 9,
    validated: false,
  },
  {
    title: "Eclair",
    id: 262,
    price: 16,
    validated: true,
  },
  {
    title: "Cupcake",
    id: 305,
    price: 3.7,
    validated: true,
  },
  {
    title: "Gingerbread",
    id: 356,
    price: 16,
    validated: true,
  },
];

const LocationList = () => {
  const { t } = useTranslation(["admin_admin"]);

  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={t("admin_admin:locations.location_list_tsx.title")}
        currentPageTitle={t(
          "admin_admin:locations.location_list_tsx.currentPageTitle"
        )}
        pathValues={[]}
      />
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
          {dataTemp.length === 0 ? (
            <div style={{ color: "white" }}>
              {t("admin_admin:locations.location_list_tsx.no_location")}
            </div>
          ) : (
            <Table sx={{ borderRadius: 20, color: "#fff" }}>
              <thead>
                <tr>
                  <th>
                    {t(
                      "admin_admin:locations.location_infos.location_infos_tsx.list.id"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin_admin:locations.location_infos.location_infos_tsx.list.title"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin_admin:locations.location_infos.location_infos_tsx.list.price"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin_admin:locations.location_infos.location_infos_tsx.list.valid"
                    )}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dataTemp.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.validated ? (
                        <CheckCircleOutlineRoundedIcon color="success" />
                      ) : (
                        <HighlightOffRoundedIcon sx={{ color: red[500] }} />
                      )}
                    </td>
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
          )}
        </Sheet>
      </div>
    </div>
  );
};

export default LocationList;
