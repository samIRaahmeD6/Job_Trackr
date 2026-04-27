import React from 'react'

const FavouriteButton = ({ isFavorite, onToggle }) => {
  return (
    <button onClick={onToggle}>
      <span
        className={`text-xl ${
          isFavorite ? "text-yellow-400 font-bold" : "text-gray-400"
        }`}
      >
        ★
      </span>
    </button>
  );
};

export default FavouriteButton