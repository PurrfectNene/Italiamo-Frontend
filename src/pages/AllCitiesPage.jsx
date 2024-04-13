import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function AllCitiesPage() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/cities`)
            .then(response => {
                setCities(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <div>
            <h1>All the Italian Cities</h1>
            </div>
            <div>
                <h2>Italian cities are unique places full of art, history and culture that will easily enchant you</h2>
                <p>From the art filled streets of Florence to the romantic canals of Venice, every Italian city has unparalleled charm waiting to be discovered. Enjoy a relaxing holiday, discover some of the most incredible history in the world, and taste delicious food and wine for which Italy is famous worldwide.</p>
            </div>
            <ul>
                {cities.map(city => (
                    <li key={city._id} style={{ listStyleType: 'none'}}>
                        <Link to={`/cities/${city._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2>{city.name}</h2>
                            <p>{city.description}</p>
                            <Link to={`/regions/${city.region._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <p>{city.region.name}</p>
                            </Link>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllCitiesPage;

