import styles from "./Search.module.scss";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "@utils/Context/SearchContext";
import ItemSearch from "./ItemSearch/ItemSearch";
import { Pagination } from "@mui/material";
import { ComponentOnMove } from "./ComponentOnMove";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Rental } from "../../../../../../../back/oxygenbnb/src/tables/rental/entities/rental.entity";
import axios from "axios";
import { RentalFormatedWithLocalisations } from "../../../../../../../back/oxygenbnb/src/tables/rental/rental.service";

// const data = [
//   {
//     id: 1,
//     coordonates: {
//       address: {
//         country: "France",
//         country_code: "fr",
//         county: "Hauts-de-Seine",
//         postcode: "92700",
//         state: "Île-de-France",
//         city: "Colombes",
//       },
//       boundingbox: ["48.9060291", "48.9376156", "2.2204263", "2.2733245"],
//       lat: 48.922788,
//       lon: 2.2543577,
//     },
//     name: "Loft dans Colombes",
//     pricePerNight: 100,
//     numberOfPeopleMax: 5,
//     owner: "Franck B.",
//     img: "url(https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720)",
//   },
//   {
//     id: 2,
//     coordonates: {
//       address: {
//         country: "France",
//         country_code: "fr",
//         county: "Hauts-de-Seine",
//         postcode: "92700",
//         state: "Île-de-France",
//         village: "Colombes",
//       },
//       boundingbox: ["48.9033964", "48.9268210", "2.2570320", "2.2806012"],
//       lat: 48.9148269,
//       lon: 2.2674892,
//     },
//     name: "Petit appartement dans Bois-Colombes",
//     pricePerNight: 110,
//     numberOfPeopleMax: 2,
//     owner: "Lucy L.",
//     img: "url(https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720)",
//   },
//   {
//     id: 3,
//     coordonates: {
//       address: {
//         country: "France",
//         country_code: "fr",
//         county: "Hauts-de-Seine",
//         postcode: "92250",
//         state: "Île-de-France",
//         island: "La Garenne-Colombes",
//       },
//       boundingbox: ["48.9006410", "48.9136126", "2.2290981", "2.2582180"],
//       lat: 48.9069349,
//       lon: 2.2465748,
//     },
//     name: "Grande maison dans La Garenne-Colombes",
//     pricePerNight: 100,
//     numberOfPeopleMax: 12,
//     owner: "Léo L.",
//     img: "url(https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720)",
//   },
//   {
//     id: 4,
//     coordonates: {
//       address: {
//         country: "France",
//         country_code: "fr",
//         county: "Hauts-de-Seine",
//         municipality: "Nanterre",
//         postcode: "92230",
//         state: "Île-de-France",
//         town: "Gennevilliers",
//       },
//       boundingbox: ["48.9251351", "48.9252351", "2.2937859", "2.2938859"],
//       lat: 48.9251851,
//       lon: 2.2938359,
//     },
//     name: "Appartement dans Genevilliers",
//     pricePerNight: 80,
//     numberOfPeopleMax: 8,
//     owner: "Bernard",
//     img: "url(https://a0.muscache.com/im/pictures/hosting/Hosting-1091406064401555181/original/2a267761-110c-4aba-862b-c38d988feb58.jpeg?im_w=720)",
//   },
// ];

const ResetCenterView = ({ selectPosition }): any => {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      if (selectPosition?.boundingbox) {
        map.fitBounds([
          [selectPosition?.boundingbox[0], selectPosition?.boundingbox[2]],
          [selectPosition?.boundingbox[1], selectPosition?.boundingbox[3]],
        ]);
      } else
        map.fitBounds([
          [48.8155755, 2.224122],
          [48.902156, 2.4697602],
        ]),
          map.setView(
            L.latLng(
              selectPosition?.lat || 48.8588897,
              selectPosition?.lon || 2.3200410217200766
            ),
            map.getZoom(),
            {
              animate: true,
            }
          );
    }
  }, [selectPosition]);
};

const Search = () => {
  const { t } = useTranslation(["site"]);
  const { citySelected, numberOfNightSelected } = useContext(SearchContext);
  const [positionToView, setPoisitionToView] = useState();
  const [mapBounds, setMapBounds] = useState({
    _northEast: {
      lat: 48.99553703238219,
      lng: 2.534408569335938,
    },
    _southWest: {
      lat: 48.72267919382413,
      lng: 2.122421264648438,
    },
  });
  const [page, setPage] = useState(1);
  const elementLengthMaxPerPage = 3;
  const [locationsData, setLocationsData] = useState<RentalFormatedWithLocalisations[]>([])
  const fetchLocations = async () => {
    const locationsRaw: { data: RentalFormatedWithLocalisations[] } = await axios.get(
      `/rental/search/${mapBounds._southWest.lng}/${mapBounds._northEast.lng}/${mapBounds._southWest.lat}/${mapBounds._northEast.lat}`);
    console.log(locationsRaw.data);
    // console.log(locationsRaw.data[0].localisation_infos)
    // console.log(JSON.parse(locationsRaw.data[0].localisation_infos))
    setLocationsData(locationsRaw.data.filter((l) => l.active && l.isValid ));
  }

  useEffect(() => {
    fetchLocations();
  }, [])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPoisitionToView(citySelected);
  }, [citySelected]);

  const mapOnMove = (item) => {
    setMapBounds(item);
    fetchLocations();
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.listOfItem}>
          {locationsData
            .slice(
              (page - 1) * elementLengthMaxPerPage,
              page * elementLengthMaxPerPage
            )
            .map((item, index) => (
              <ItemSearch
                key={index}
                item={item}
                numberOfNight={numberOfNightSelected}
              />
            ))}
        </div>
        <div className={styles.padding}>
          <Pagination
            count={Math.ceil(locationsData?.length / elementLengthMaxPerPage) | 0}
            color="primary"
            page={page}
            onChange={handleChange}
            showFirstButton
            showLastButton /*page={page} onChange={handleChange}*/
          />
        </div>
      </div>

      <div className={styles.right}>
        <MapContainer
          center={[0, 0]}
          zoom={5}
          style={{ width: "inherit", height: "100%" }}
        >
          <ComponentOnMove setMapBounds={(e) => mapOnMove(e)} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationsData
            .filter(
              (e) =>
                mapBounds._northEast.lat >= JSON.parse(e.localisation_infos).lat &&
                mapBounds._southWest.lat <= JSON.parse(e.localisation_infos).lat &&
                mapBounds._northEast.lng >= JSON.parse(e.localisation_infos).lon &&
                mapBounds._southWest.lng <= JSON.parse(e.localisation_infos).lon
            )
            .map((item, index) => (
              <>
                {/* <div className={styles.test}></div> */}
                <Marker
                  position={[JSON.parse(item.localisation_infos).lat, JSON.parse(item.localisation_infos).lon]}
                  key={index}
                >
                  <Popup>
                    <Link
                      to={`/o/room/${item.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {JSON.parse(item.localisation_infos).address ? (
                        <>
                          <h1>{item.title}</h1>
                          <div>
                            {JSON.parse(item.localisation_infos).address?.city ||
                              JSON.parse(item.localisation_infos).address?.town ||
                              JSON.parse(item.localisation_infos).address?.village ||
                              JSON.parse(item.localisation_infos).address?.state ||
                              JSON.parse(item.localisation_infos).address?.island}
                            {JSON.parse(item.localisation_infos).address?.postcode
                              ? ` (${JSON.parse(item.localisation_infos).address?.postcode})`
                              : ""}
                            ,{" "}
                            {JSON.parse(item.localisation_infos).address?.country ===
                            "États-Unis d'Amérique"
                              ? "USA"
                              : JSON.parse(item.localisation_infos).address?.country}
                          </div>
                          <h3>
                            {item.default_price}
                            {item.default_currency.substring(0,1)}/
                            {t(
                              "site:main.search.search_tsx.popup.default_paris"
                            )}
                          </h3>
                        </>
                      ) : (
                        t("site:main.search.search_tsx.popup.default_paris")
                      )}
                    </Link>
                  </Popup>
                </Marker>
              </>
            ))}
          <ResetCenterView selectPosition={positionToView} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Search;
