import { State } from "./state.js";
import { getCommands } from "./command.js";

export function commandHelp(state: State): void {
  const commands = state.commands;
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const command in commands) {
    console.log(`${commands[command].name}: ${commands[command].description}`);
  }
}
