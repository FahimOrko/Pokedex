import { State } from "../state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  const pokedex = state.pokedex;

  if (args.length === 0) {
    console.log("Please provide a pokemon name");
    state.readline.prompt();
    return;
  }

  if (args.length > 1) {
    console.log("Please provide only one pokemon name");
    state.readline.prompt();
    return;
  }

  const pokemonName = args[0];

  if (pokedex[pokemonName]) {
    const pokemon = pokedex[pokemonName];
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    pokemon.stats.forEach((stat) => {
      console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    });
    console.log(`Types:`);
    pokemon.types.forEach((type) => {
      console.log(`  - ${type.type.name}`);
    });
  }

  state.readline.prompt();
}
