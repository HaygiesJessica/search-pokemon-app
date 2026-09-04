import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!searchTerm.trim()) {
      alert("Please enter a Pokémon name.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokemon not found");
      }

      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
      alert("Pokemon not found!");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <Header
          title="Pokemon Search App"
        />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        <PokemonCard
          pokemon={pokemon}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;