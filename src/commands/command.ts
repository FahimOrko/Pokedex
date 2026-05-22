import { Commands, State } from "../state.js";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandEncounter } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function getCommands(): Commands {
  return {
    help: {
      name: "help",
      description: "Displays all commands\nUsage: help",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the map locations\nUsage: map",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous map locations\nUsage: mapb",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description:
        "Explore a location to find pokemons\nUsage: explore <location name>",
      callback: commandEncounter,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a pokemon\nUsage: catch <pokemon name>",
      callback: commandCatch,
    },
    pokedex: {
      name: "pokedex",
      description: "Displays your pokedex\nUsage: pokedex",
      callback: commandPokedex,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a pokemon's details\nUsage: inspect <pokemon name>",
      callback: commandInspect,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex\nUsage: exit",
      callback: commandExit,
    },
  };
}
