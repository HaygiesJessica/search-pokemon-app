import PropTypes from "prop-types";

const TYPE_COLORS = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

function getNameStyle(types) {
  const colors = types.map((t) => TYPE_COLORS[t.type.name]);

  if (colors.length === 1) {
    return { color: colors[0] };
  }

  return {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
}

function formatStatName(name) {
  return name
    .replace("special-attack", "Special Attack")
    .replace("special-defense", "Special Defense")
    .replace("hp", "HP")
    .replace("attack", "Attack")
    .replace("defense", "Defense")
    .replace("speed", "Speed");
}

function PokemonCard({ pokemon, loading }) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!pokemon) {
    return <h2>Search for a Pokémon!</h2>;
  }

  return (
    <div className="pokemon-card">
      <h2 style={getNameStyle(pokemon.types)}>
        {pokemon.name.toUpperCase()}
      </h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <p>
        <strong>ID:</strong> {pokemon.id}
      </p>

      <p>
        <strong>Height:</strong> {pokemon.height}
      </p>

      <p>
        <strong>Weight:</strong> {pokemon.weight}
      </p>

      <h3>Types</h3>

      <ul>
        {pokemon.types.map((type) => (
          <li
            key={type.type.name}
            className={`type-${type.type.name}`}
          >
            {type.type.name}
          </li>
        ))}
      </ul>

      <h3>Abilities</h3>

      <ul className="abilities-list">
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>
            {ability.ability.name}
          </li>
        ))}
      </ul>

      <h3>Base Stats</h3>

      <table className="stats-table">
        <tbody>
          {pokemon.stats.map((stat) => (
            <tr key={stat.stat.name}>
              <td>{formatStatName(stat.stat.name)}</td>
              <td>{stat.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {pokemon.cries?.latest && (
        <>
          <h3>Pokémon Cry</h3>

          <audio controls>
            <source
              src={pokemon.cries.latest}
              type="audio/ogg"
            />
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default PokemonCard;