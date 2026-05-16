import { State } from "../state.js";

export async function commandHelp(state: State): Promise<void> {
  const commands = state.commands;
  console.log("Welcome to the Pokedex!");
  console.log("\n-----------------------------------------------");
  console.log("Commands:");
  console.log("-----------------------------------------------");
  for (const command in commands) {
    console.log(`${commands[command].name}: ${commands[command].description}`);
    console.log("-----------------------------------------------");
  }
  console.log("\n");
  state.readline.prompt();
}
