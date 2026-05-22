import { State } from "../state.js";

export async function commandPokedex(state: State): Promise<void> {
  const pokedex = state.pokedex;
  if (Object.keys(pokedex).length === 0) {
    console.log("Your Pokedex is empty. Catch some Pokemon first!");
    state.readline.prompt();
    return;
  }

  console.log("Your Pokedex:");
  for (const [key, pokemon] of Object.entries(pokedex)) {
    console.log(
      `- ${pokemon.name} (Base Experience: ${pokemon.base_experience})`,
    );
  }
  state.readline.prompt();
}
