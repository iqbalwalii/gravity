"use client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonDetails({ params }) {
  const { name } = params;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data));
    }
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <nav className="mb-4">
        <Link href="/">Home</Link> &gt; {pokemon.name}
      </nav>
      <div className="customcard">
        <div className="head">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-64 h-64"
          />
        </div>
        <div className="body">
          <div className="mt-4">
            <li>
              <strong>Name:</strong> {pokemon?.name}
            </li>
            <li>
              <strong>Type:</strong>{" "}
              {pokemon?.types?.map((value, idx) => (
                <span>{value?.type.name},</span>
              ))}
            </li>
            <li>
              <strong>Stats:</strong>{" "}
              {pokemon?.stats?.map((value, idx) => (
                <span>{value?.stat.name},</span>
              ))}
            </li>
            <li>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.map((ability) => (
                <span key={ability.ability.name}>{ability.ability.name}, </span>
              ))}
            </li>
            <li>
              <strong>Some Moves:</strong>{" "}
              {pokemon?.moves?.slice(0, 5).map((value, idx) => (
                <span>{value?.move.name},</span>
              ))}
            </li>
            <ul></ul>
          </div>
        </div>
      </div>
    </div>
  );
}
