import { createInterface, type Interface } from "readline";
import { CLICommand, getCommands } from "./commands/command.js";
import { PokeAPI } from "./pokeapi/index.js";

export type Readline = Interface;
export type Commands = Record<string, CLICommand>;

export type State = {
  readline: Readline;
  commands: Commands;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | undefined;
  prevLocationsURL: string | undefined;
};

export function initState(): State {
  // ----------------------------------------
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  // ----------------------------------------
  const commands = getCommands();
  // ----------------------------------------
  const pokeAPI = new PokeAPI();
  // ----------------------------------------

  return {
    readline: rl,
    commands,
    pokeAPI,
    nextLocationsURL: undefined,
    prevLocationsURL: undefined,
  };
}
