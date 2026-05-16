import { Commands, State } from "../state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
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
      callback: commandMapBack,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex\nUsage: exit",
      callback: commandExit,
    },
  };
}
