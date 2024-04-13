import React, { useEffect, useState } from "react";
import axios from 'axios';

function AllRegionsPage() {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/regions`)
            .then(response => {
                setRegions(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const truncateDescription = (description) => {
        return description.slice(0, 60) + (description.length > 60 ? "..." : "");
    };


    return (
        <div>
            <div>
            <h1>Italian Regions</h1>
            </div>
            <div>
                <h2>Go in search of the most beautiful places in Italy, get lost in the wonders of its regions</h2>
                <p>Where to go on holiday in Italy? The Italian regions to visit offer something unique and well worth exploring. From the snow capped peaks of Veneto, to the sunny beaches of Calabria, each has its own climate and landscape. 
                A diversity that is also reflected in the food, architecture and even the language spoken.</p>
            </div>
            {regions.map(region => (
                <div key={region._id}>
                    <h2>{region.name}</h2>
                    <p>{truncateDescription(region.description)}</p>
                </div>
            ))}
        </div>
    );
}

export default AllRegionsPage;
