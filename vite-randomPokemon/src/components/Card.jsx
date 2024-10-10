import React from 'react';
import './Card.css';

const Card = ({ pokemon }) => {
  let jnProps = pokemon.Jn;
  let jnName = pokemon.Jn.names[0];
  console.log(pokemon.Jn.names[0]);
  return (
    <div key={pokemon.name} className="pokemon-card">
      <p>No.{jnProps.id}</p>
      <h2 className="cardName">{jnName.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="cardImg"
      />
    </div>
  );
};

export default Card;
