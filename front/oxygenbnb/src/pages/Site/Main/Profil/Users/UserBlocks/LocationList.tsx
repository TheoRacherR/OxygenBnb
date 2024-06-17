import { useEffect, useState } from "react";
import styles from "./Styles.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { RentalFormated } from "../../../../../../../../../back/oxygenbnb/src/tables/rental/rental.service";
import axios from "axios";

const LocationList = ({ user_id }) => {
  const { t } = useTranslation(["site"]);
  const [locationListData, setLocationListData] = useState<RentalFormated[]>([]);

  const fetchLocations = async () => {
    const locationListRaw: { data: RentalFormated[] } = await axios.get(
      "http://localhost:3333" + "/rental/owner/" + user_id
    );
    setLocationListData(locationListRaw.data);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const patchActiveLocation = async (bool: boolean, rental_id: number) => {
    try {
      await axios.patch(
        "http://localhost:3333" + "/rental/" + rental_id, {
          active: bool
        }
      )
      fetchLocations();
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <Accordion sx={{ backgroundColor: "#f0f0f0" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          backgroundColor: "f0f0f0",
          color: "black",
          border: "1px solid #32383e",
          borderRadius: "10px",
        }}
      >
        <AssignmentRoundedIcon />
        &nbsp;
        {t("site:main.profil.users.user_blocks.location_list_tsx.summary")}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "f0f0f0",
          color: "black",
          border: "1px solid #32383e",
        }}
      >
        <div className={styles.main_list}>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "10px",
              // padding: "10px",
              maxWidth: "100%",
              overflow: "auto",
              maxHeight: "100%",
              backgroundColor: "#f0f0f0",
              // borderColor: "grey",
            }}
          >
            {locationListData.length === 0 ? (
              <div style={{ color: "black" }}>
                {t(
                  "site:main.profil.users.user_blocks.location_list_tsx.no_location"
                )}
              </div>
            ) : (
              <Table sx={{ borderRadius: 20, color: "black" }}>
                <thead>
                  <tr>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.location_list_tsx.list.id"
                      )}
                    </th>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.location_list_tsx.list.title"
                      )}
                    </th>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.location_list_tsx.list.price"
                      )}
                    </th>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.location_list_tsx.list.valid"
                      )}
                    </th>
                    <th>
                      {t(
                        "site:main.profil.users.user_blocks.location_list_tsx.list.active"
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
                        {item.active ? (
                          <Button color="danger" onClick={() => patchActiveLocation(false, item.id)}>{t("site:main.profil.users.user_blocks.location_list_tsx.list.desactivate")}</Button>
                        ) : (
                          <Button color="success" onClick={() => patchActiveLocation(true, item.id)}>{t("site:main.profil.users.user_blocks.location_list_tsx.list.activate")}</Button>
                        )}
                      </td>
                      <td>
                        <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                          <Link to={`/o/room/${item?.id}`}>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default LocationList;
