import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link, useParams} from "react-router-dom"

function CityDetailsPage() {
    const { id } = useParams();
    const [city, setCity] = useState(null);
    const [places, setPlaces] = useState([]);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/cities/${id}`)
            .then(response => {
                setCity(response.data);
            })
            .catch(err => {
                console.log(err);
            });

            axios.get(`${import.meta.env.VITE_API_URL}/api/cities/${id}/places`)
            .then(response => {
                setPlaces(response.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, [id]);

    if (!city) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{city.name}</h1>
            <p>{city.description}</p>

            <h2>What to see</h2>
            <ul>
                {places.map(place => (
                    <li key={place._id}>
                        <Link to={`/cities/${city._id}/places/${place._id}`}>{place.name}</Link>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default CityDetailsPage;

