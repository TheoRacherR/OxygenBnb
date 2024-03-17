import styles from "./Search.module.scss"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../../utils/Context/SearchContext";
import ItemSearch from "./ItemSearch/ItemSearch";
import { Button, Pagination } from "@mui/material";
import { ComponentOnMove } from "./ComponentOnMove";
import { Link } from "react-router-dom";

const data = [
  {
    coordonates: {
      address: {
        country : "France",
        country_code : "fr",
        county : "Hauts-de-Seine",
        postcode : "92700",
        state : "Île-de-France",
        city : "Colombes"
      },
      boundingbox : ['48.9060291', '48.9376156', '2.2204263', '2.2733245'],
      lat : 48.922788,
      lon : 2.2543577,
    },
    name: 'Loft dans Colombes',
    pricePerNight: 100,
    numberOfPeopleMax: 5,
    owner: "Franck B."
  },
  {
    coordonates: {
      address: {
        country : "France",
        country_code : "fr",
        county : "Hauts-de-Seine",
        postcode : "92700",
        state : "Île-de-France",
        village : "Colombes"
      },
      boundingbox : ['48.9033964', '48.9268210', '2.2570320', '2.2806012'],
      lat : 48.9148269,
      lon : 2.2674892,
    },
    name: 'Petit appartement dans Bois-Colombes',
    pricePerNight: 110,
    numberOfPeopleMax: 2,
    owner: "Lucy L."
  },
  {
    coordonates: {
      address : {
        country : "France",
        country_code : "fr",
        county : "Hauts-de-Seine",
        postcode : "92250",
        state : "Île-de-France",
        island : "La Garenne-Colombes",
      },
      boundingbox : ['48.9006410', '48.9136126', '2.2290981', '2.2582180'],
      lat : 48.9069349,
      lon : 2.2465748,
    },
    name: 'Grande maison dans La Garenne-Colombes',
    pricePerNight: 100,
    numberOfPeopleMax: 12,
    owner: 'Léo L.'
  },
  {
    coordonates: {
      address : {
        country : "France",
        country_code : "fr",
        county : "Hauts-de-Seine",
        municipality : "Nanterre",
        postcode : "92230",
        state : "Île-de-France",
        town : "Gennevilliers"
      },
      boundingbox : ['48.9251351', '48.9252351', '2.2937859', '2.2938859'],
      lat : 48.9251851,
      lon : 2.2938359,
    },
    name: 'Appartement dans Genevilliers',
    pricePerNight: 80,
    numberOfPeopleMax: 8,
    owner: 'Bernard'
  },
]


const ResetCenterView = ({selectPosition}): any => {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.fitBounds(selectPosition?.boundingbox || [["48.8155755", "2.2241220"],["48.9021560", "2.4697602"]]),
      map.setView(
        L.latLng(selectPosition?.lat || 48.8588897, selectPosition?.lon || 2.3200410217200766),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);
}

const Search = () => {
  const { citySelected, numberOfNightSelected } = useContext(SearchContext);
  const [positionToView, setPoisitionToView] = useState();
  const [mapBounds, setMapBounds] = useState({
    _northEast: {
      lat: 48.99553703238219,
      lng: 2.534408569335938
    },
    _southWest: {
      lat: 48.72267919382413,
      lng: 2.122421264648438
    }
  })
  const [page, setPage] = useState(1);
  const elementLengthMaxPerPage = 3;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPoisitionToView(citySelected);
  }, [citySelected])

  // useEffect(() => {
  //   console.log(mapBounds._northEast.lat)
  // }, [mapBounds])



  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <div className={styles.listOfItem}>
        {data.slice(((page - 1) * elementLengthMaxPerPage) , (page * elementLengthMaxPerPage)).map((item, index) => (
          <ItemSearch key={index} item={item} numberOfNight={numberOfNightSelected}/>
        ))}
      </div>
      <div className={styles.padding}>
        <Pagination count={Math.ceil(data?.length/elementLengthMaxPerPage) | 0} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton /*page={page} onChange={handleChange}*//>
      </div>
    </div>

    <div className={styles.right}>
      <MapContainer
        center={[0,0]}
        zoom={5}
        style={{ width: "inherit", height: "100%" }}
      >
        <ComponentOnMove setMapBounds={(e) => setMapBounds(e)}/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[citySelected?.lat || 48.8588897, citySelected?.lon || 2.3200410217200766]}>
          <Popup>
            {citySelected.address ?
              <>`${citySelected.address.city || citySelected.address.town || citySelected.address.village || citySelected.address.state || citySelected.address.island}`
              `${citySelected.address.postcode ? ` (${citySelected.address.postcode})` :  ''}`
              `, ${citySelected.address.country === "États-Unis d'Amérique" ? "USA" : citySelected.address.country}`</>
            :
            "Paris, France"
            }
          </Popup>
        </Marker> */}
        {
            data
            .filter(e => (
              mapBounds._northEast.lat >= e.coordonates.lat 
              && mapBounds._southWest.lat <= e.coordonates.lat 
              && mapBounds._northEast.lng >= e.coordonates.lon
              && mapBounds._southWest.lng <= e.coordonates.lon
            ))
            .map((item, index) => (
              <>
              {/* <div className={styles.test}></div> */}
              <Marker position={[item.coordonates.lat, item.coordonates.lon]} key={index}>
                <Popup>
                  <Link to={`/o/room/${index}`} style={{textDecoration: "none", color: "black"}}>
                      {item.coordonates.address ?
                        <>
                        <h1>{item.name}</h1>
                        <div>
                          {item.coordonates.address?.city || item.coordonates.address?.town || item.coordonates.address?.village || item.coordonates.address?.state || item.coordonates.address?.island}
                          {item.coordonates.address?.postcode ? ` (${item.coordonates.address?.postcode})` :  ''}
                          , {item.coordonates.address?.country === "États-Unis d'Amérique" ? "USA" : item.coordonates.address?.country}
                        </div>
                        <h3>{item.pricePerNight}e/night</h3>
                        </>
                      :
                      "Paris, France"
                      }
                  </Link>
                </Popup>
              </Marker>
              </>
            ))
          }
        <ResetCenterView selectPosition={positionToView} />
      </MapContainer>
    </div>

    </div>
  )
}

export default Search;