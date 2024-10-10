import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axiosを使う場合
import Card from './components/Card';
import './App.css';
import Navber from './components/Navber/Navber';

function App() {
  const [pokemonList, setPokemonList] = useState([]); // 6体のポケモンを保存する
  const [loading, setLoading] = useState(true);

  // PokeAPIからすべてのポケモンを取得する
  const fetchAllPokemon = async () => {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=1024'
      ); // 1024体すべてのポケモンを取得
      return response.data.results; // ポケモンリストを返す
    } catch (error) {
      console.error('ポケモンの取得に失敗しました', error);
      return [];
    }
  };

  // ランダムに6体のポケモンを選ぶ
  const getRandomPokemons = (pokemonList) => {
    const shuffledList = pokemonList.sort(() => 0.5 - Math.random());
    return shuffledList.slice(0, 6); // ランダムに6体を選ぶ
  };

  // ポケモンの詳細を取得して状態にセット
  const fetchPokemonDetails = async (pokemonList) => {
    const promises = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const res = await axios.get(pokemon.url); // 各ポケモンの詳細情報を取得
        const resJn = await axios.get(res.data.species.url);
        const Jn = resJn.data;
        // console.log(resJn);
        return { ...res.data, Jn };
      })
    ); // すべてのポケモンデータを待つ
    console.log(promises);
    setPokemonList(promises); // 状態にセット

    setLoading(false); // ローディング完了
  };

  // ボタンをクリックしてランダムポケモンを選び直す
  const handleRandomize = async () => {
    setLoading(true); // ローディング開始
    const allPokemon = await fetchAllPokemon(); // すべてのポケモンを取得
    const randomPokemons = getRandomPokemons(allPokemon); // ランダムに6体選出
    await fetchPokemonDetails(randomPokemons); // 6体のポケモンの詳細を取得
  };

  // 初回ロード時にポケモンデータを取得
  useEffect(() => {
    handleRandomize(); // 初回ロード時にランダム表示
  }, []);

  return (
    <>
      <div className="App">
        <Navber />

        {loading ? (
          <p>ロード中...</p>
        ) : (
          <div className="pokeCardContainer">
            {pokemonList.map((pokemon) => (
              <Card key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        )}
        <button onClick={handleRandomize} className="btn">
          選び直す
        </button>
      </div>
    </>
  );
}

export default App;
