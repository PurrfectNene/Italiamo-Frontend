import React from 'react';

function FavouritesList(props) {
  console.log(props.favoritesRegions);

  if (!props.favoriteRegions || props.favoriteRegion.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2>Your Favourite Regions:</h2>
      <ul>
        {props.favoritesRegions.map((favoriteRegion, index) => (
          <li key={index}>{favoriteRegion.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavouritesList;
