import { useMapEvents } from 'react-leaflet';

const ComponentOnMove = ({setMapBounds}) => {
  const map = useMapEvents({
    dragend: (e) => {
      // console.log("mapCenter", e.target.getCenter());
      // console.log("map bounds", e.target.getBounds());
      console.log("all map options", e.target.getBounds());
      setMapBounds(e.target.getBounds())
    }
  });
  return null;
}

export { ComponentOnMove };