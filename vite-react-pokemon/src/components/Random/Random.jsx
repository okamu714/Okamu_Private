import React from 'react';
import Card from '../Card/Card'; // Cardコンポーネントをインポート

const Random = ({ pokemonData }) => {
  // ランダムに6体のポケモンを選ぶ
  const getRandomPokemons = (pokemonList) => {
    const shuffledList = pokemonList.sort(() => 0.5 - Math.random());
    return shuffledList.slice(0, 6); // 6体だけ選出
  };

  const randomPokemons = getRandomPokemons(pokemonData); // ランダムにポケモンを選ぶ

  return (
    <div className="randomPokemonContainer">
      <h2>ランダムに選ばれた6体のポケモン</h2>
      <div className="pokeCardContainer">
        {randomPokemons.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Random;
