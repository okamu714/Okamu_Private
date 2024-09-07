import { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navber from './components/Navber/Navber';

function App() {
  const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState(
    'https://pokeapi.co/api/v2/pokemon/?offset=1300&limit=20'
  );

  useEffect(() => {
    const fetchPokemonData = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(pokeApiUrl);
      //各ポケモンの詳細なデータを取得
      // console.log(res);
      loadPokemon(res.results);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(
      prevURL ?? 'https://pokeapi.co/api/v2/pokemon/?offset=1300&limit=20'
    );
    console.log(data);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(
      nextURL ?? 'https://pokeapi.co/api/v2/pokemon/'
    );
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navber />
      <div className="App">
        {loading ? (
          <h1 className="loading">ロード中</h1>
        ) : (
          <>
            <div className="pokeCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={pokemon.name} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
