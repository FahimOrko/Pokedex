import { createInterface, type Interface } from "readline";
import { CLICommand, getCommands } from "./commands/command.js";
import { PokeAPI } from "./pokeapi/index.js";
import { Pokemon } from "./pokeapi/pokemon.t.js";

export type Readline = Interface;
export type Commands = Record<string, CLICommand>;
export type Pokedex = Record<string, Pokemon>;

export type State = {
  readline: Readline;
  commands: Commands;
  pokeAPI: PokeAPI;
  pokedex: Pokedex;
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
  const pokedex: Pokedex = {};
  // ----------------------------------------

  return {
    readline: rl,
    commands,
    pokeAPI,
    pokedex,
    nextLocationsURL: undefined,
    prevLocationsURL: undefined,
  };
}
