import { useEffect, useRef, useState } from "react";

function Marker({ position, map }) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      marker.setOptions({
        position: new window.google.maps.LatLng(...position),
        map,
      });
    }
  }, [marker, position, map]);
  return null;
}

const position = [41.8901247, 12.8128343];
const markerPosition = [41.8809232, 12.6923338];

export default function GoogleMap() {
  const ref = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: new window.google.maps.LatLng(...position),
          zoom: 12,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          draggable: false,
        })
      );
    }
  }, [ref, map]);

  return (
    <div style={{ width: "100%", height: "100svh" }} ref={ref}>
      <Marker position={markerPosition} map={map} />
    </div>
  );
}
