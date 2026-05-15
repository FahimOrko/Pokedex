import { getCommands } from "./command.js";

export function commandHelp(): void {
  const commands = getCommands();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const command in commands) {
    console.log(`${commands[command].name}: ${commands[command].description}`);
  }
}
