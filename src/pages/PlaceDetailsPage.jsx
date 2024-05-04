import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Review from "../components/Review"
import Loading from "../components/Loading";

function PlaceDetailsPage() {
  const { cityId, placeId } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    console.log("cityId:", cityId);
    console.log("placeId:", placeId);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/cities/${cityId}/places/${placeId}`
      )
      .then((response) => {
        setPlace(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cityId, placeId]);

  if (!place) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{place.name}</h1>
      <p>{place.description}</p>
      <Review placeId={placeId} />
    </div>
  );
}

export default PlaceDetailsPage;
