import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand, Commands } from "../state.js";

export function getCommands(): Commands {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}
