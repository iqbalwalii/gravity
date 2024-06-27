"use client";
import { useState, useEffect } from "react";
import PokemonCard from "./components/pokemon";

export default function Home() {
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((response) => response.json())
      .then((data) => setTypes(data.results));
    const fetchPokemon = async () => {
      const pokemonResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const pokemonData = await pokemonResponse.json();

      const detailedPokemonData = await Promise.all(
        pokemonData.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);
          return detailsResponse.json();
        })
      );
      setPokemonList(detailedPokemonData);
    };

    const fetchTypes = async () => {
      const typeResponse = await fetch("https://pokeapi.co/api/v2/type");
      const typeData = await typeResponse.json();
      setTypes(typeData.results);
    };

    fetchPokemon();
    fetchTypes();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const isTypeMatch = selectedType
      ? pokemon.types.includes(selectedType)
      : true;
    const isSearchMatch = pokemon.name.includes(search);
    return isTypeMatch && isSearchMatch;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pokémon Search</h1>
      <div className="mb-4 flex items-center">
        <select
          className="border p-2 mr-4"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={handleSearchChange}
          className="border p-2 flex-grow"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredPokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
