import React from 'react';
import './Card.css';

const Card = ({ pokemon, pokemonDataJn }) => {
  let jnObjects = pokemon.jnObject;
  let jnObjectName = jnObjects.names[0].name;
  // console.log(pokemon);
  return (
    <div className="card">
      <div className="cardId">No.{jnObjects.id}</div>
      <div className="cardImg">
        {pokemon.sprites.front_default ? (
          <img src={pokemon.sprites.front_default} alt=""></img>
        ) : (
          <p>現在画像準備中です</p>
        )}
      </div>
      <h3 className="cardName">{jnObjectName}</h3>
      <div className="cardTypes">
        <div>
          タイプ:
          {pokemon.jnType.map((type) => {
            return (
              <span key={type} className="typeName">
                {type}
              </span>
            );
          })}
        </div>
      </div>
      <div className="cardInfo">
        <div className="cardData">
          特性：
          {pokemon.jnAbility.map((ability) => {
            return (
              <span key={ability} className="title">
                {ability}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
