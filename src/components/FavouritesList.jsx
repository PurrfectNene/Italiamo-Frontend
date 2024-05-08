import React from 'react';

function FavouritesList(props) {
  console.log("props", props);
  console.log(props.favoritesCities)
  console.log(props.favoritePlace)
  return (
    <div>
      <div>
        <h2>Your Favourite Regions:</h2>
        <ul>
          {props.favoritesRegions.map((favoriteRegion, index) => (
            <li key={index}>{favoriteRegion.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Your Favourite Cities:</h2>
        <ul>
          {props.favoritesCities.map((favoriteCity, index) => {
            console.log("Favorite City:", favoriteCity.name); 
            return <li key={index}>{favoriteCity.name}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2>Your Favourite Places:</h2>
        <ul>
          {props.favoritesPlaces.map((favoritePlace, index) => {
            console.log("Favorite Place:", favoritePlace.name); 
            return <li key={index}>{favoritePlace.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default FavouritesList;

