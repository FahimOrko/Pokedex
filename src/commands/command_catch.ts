import { catchPokemon } from "../utils/catchChance.js";
import { State } from "../state.js";
import { sleep } from "../utils/sleep.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
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

  try {
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const name = pokemon.name;
    const exp = pokemon.base_experience;
    const caught = catchPokemon(exp);

    console.log(`Throwing a Pokeball at ${name}...`);
    await sleep(2000);

    if (caught) {
      console.log(`${name} was caught!`);
      state.pokedex[name] = pokemon;
    } else {
      console.log(`${name} escaped!`);
    }

    state.readline.prompt();
  } catch (error) {
    console.error("Error catching pokemon:", pokemonName);
    state.readline.prompt();
  }
}
