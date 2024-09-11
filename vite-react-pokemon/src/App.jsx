import { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon, getPokemonJn } from './utils/pokemon';
import Card from './components/Card/Card';
import Navber from './components/Navber/Navber';
import Randam from './components/Random/Random';

function App() {
  const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [pokemonDataJn, setPokemonDataJn] = useState([]);

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

    // const fetchAllPokemon = async () => {
    //   let allRes = await getAllPokemon(
    //     'https://pokeapi.co/api/v2/pokemon?limit=1024'
    //   );
    //   let allPokemonDetails = await loadAllPokemon(allRes.results);
    //   setAllPokemonData(allPokemonDetails); // すべてのポケモンデータを保存
    //   console.log(allPokemonData);
    // };

    fetchPokemonData();
    // fetchAllPokemon();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        //各ポケモンの情報取得
        let pokemonRecord = await getPokemon(pokemon.url);
        //各ポケモンの日本語名取得
        let jnObject = await getPokemon(pokemonRecord.species.url);
        //各ポケモンのタイプ（日本語）
        let jnType = await getPokemonType(pokemonRecord.types);
        //各ポケモンの特性（日本語）
        let jnAbility = await getPokemonAbility(pokemonRecord.abilities);
        // console.log(jnAbility);
        return { ...pokemonRecord, jnObject, jnType, jnAbility };
      })
    );
    setPokemonData(_pokemonData);
  };

  // const loadAllPokemon = async (data) => {
  //   let _allPokemonData = await Promise.all(
  //     data.map(async (pokemon) => {
  //       let pokemonRecord = await getPokemon(pokemon.url);
  //       let jnObject = await getPokemon(pokemonRecord.species.url);
  //       let jnType = await getPokemonType(pokemonRecord.types);
  //       let jnAbility = await getPokemonAbility(pokemonRecord.abilities);
  //       return { ...pokemonRecord, jnObject, jnType, jnAbility };
  //     })
  //   );
  //   return _allPokemonData;
  // };

  const getPokemonType = async (data) => {
    let typeLength = data.length;
    let type = new Array();
    for (let i = 0; i < typeLength; i++) {
      const getTypes = await getPokemon(data[i].type.url);
      const getType = getTypes.names.find((val) => val.language.name === 'ja');
      type[i] = getType.name;
    }
    return type;
  };

  const getPokemonAbility = async (data) => {
    let abilityLength = data.length;
    let ability = new Array();
    for (let i = 0; i < 1; i++) {
      const getTypes = await getPokemon(data[i].ability.url);
      const getType = getTypes.names.find((val) => val.language.name === 'ja');
      ability[i] = getType.name;
    }
    return ability;
  };

  const handlePrevPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(
      prevURL ?? 'https://pokeapi.co/api/v2/pokemon/?offset=1300&limit=20'
    );
    // console.log(data);
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
            {/* <div className="randamPokemon">
              <div className="randamPokemonContainer"> */}
            {/* <Randam pokemonData={allPokemonData} /> */}
            {/* </div>
            </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default App;
