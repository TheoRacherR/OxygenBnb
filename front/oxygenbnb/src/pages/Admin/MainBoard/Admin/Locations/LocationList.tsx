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
import { useEffect, useState } from "react";
import axios from "axios";
// import { rentalType } from "../../../../../../../../back/oxygenbnb/src/tables/rental/entities/rental.entity";
import { RentalFormated } from "../../../../../../../../back/oxygenbnb/src/tables/rental/rental.service";

const LocationList = () => {
  const { t } = useTranslation(["admin"]);
  const [locationListData, setLocationListData] = useState<RentalFormated[]>([]);

  const fetchLocations = async () => {
    const locationListRaw: { data: RentalFormated[] } = await axios.get(
      "http://localhost:3333" + "/rental"
    );
    setLocationListData(locationListRaw.data);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={t("admin:admin.locations.location_list_tsx.title")}
        currentPageTitle={t(
          "admin:admin.locations.location_list_tsx.currentPageTitle"
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
          {locationListData.length === 0 ? (
            <div style={{ color: "white" }}>
              {t("admin:admin.locations.location_list_tsx.no_location")}
            </div>
          ) : (
            <Table sx={{ borderRadius: 20, color: "#fff" }}>
              <thead>
                <tr>
                  <th>
                    {t(
                      "admin:admin.locations.location_infos.location_infos_tsx.list.id"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin:admin.locations.location_infos.location_infos_tsx.list.title"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin:admin.locations.location_infos.location_infos_tsx.list.price"
                    )}
                  </th>
                  <th>
                    {t(
                      "admin:admin.locations.location_infos.location_infos_tsx.list.valid"
                    )}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {locationListData.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.id}</td>
                    <td>{item?.title}</td>
                    <td>{item?.default_price}</td>
                    <td>
                      {item.isValid ? (
                        <CheckCircleOutlineRoundedIcon color="success" />
                      ) : (
                        <HighlightOffRoundedIcon sx={{ color: red[500] }} />
                      )}
                    </td>
                    <td>
                      <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                        <Link to={`/admin/location/${item?.id}`}>
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
