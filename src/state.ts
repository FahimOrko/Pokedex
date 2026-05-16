import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: any) => void;
};

export type Readline = Interface;
export type Commands = Record<string, CLICommand>;

export type State = {
  readline: Readline;
  commands: Commands;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const commands = getCommands();

  return {
    readline: rl,
    commands,
  };
}
