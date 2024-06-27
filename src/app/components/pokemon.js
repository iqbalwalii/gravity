import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ pokemon }) {
  console.log("pikapikapika", pokemon);
  return (
    <div className="pokecard">
      <Image
        src={pokemon?.sprites?.front_default}
        alt={pokemon?.name}
        width={300}
        height={300}
      />
      <div className="cardbody">
        <h2 className="text-lg font-bold capitalize mb-2">{pokemon.name}</h2>
        <Link href={`/pokemon/${pokemon.name}`} className="mt-3 text-teal-500">
          Details
        </Link>
      </div>
    </div>
  );
}
