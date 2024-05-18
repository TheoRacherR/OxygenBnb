import { useMapEvents } from 'react-leaflet';

const ComponentOnMove = ({setMapBounds}) => {
  const map = useMapEvents({
    dragend: (e) => {
      setMapBounds(e.target.getBounds())
    }
  });
  return null;
}

export { ComponentOnMove };