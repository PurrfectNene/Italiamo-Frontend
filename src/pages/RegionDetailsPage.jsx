import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RegionDetailsPage() {
  const { id } = useParams();
  const [region, setRegion] = useState(null);
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions/${id}`)
      .then((response) => {
        setRegion(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/regions/${id}/cities`)
      .then((response) => {
        setCities(response.data);
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/regions/${id}/places`)
          .then((response) => {
            setPlaces(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!region) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{region.name}</h1>
      <p>{region.description}</p>

      <h2>Cities in {region.name}</h2>
      <ul>
        {cities.map((city) => (
          <li key={city._id}>
            <Link to={`/cities/${city._id}`}>{city.name}</Link>
          </li>
        ))}
      </ul>

      <h2>Places in {region.name}</h2>
      <ul>
        {places.map((place) => (
          <li key={place._id}>
            <Link to={`/places/${place.city._id}`}>{place.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegionDetailsPage;
