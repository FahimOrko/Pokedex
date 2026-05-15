import process from "node:process";
import { createInterface } from "node:readline";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
  const arr = input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((s) => s !== "");
  return arr;
}

export function startREPL() {
  const commands = getCommands();

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();
  rl.on("line", (line) => {
    const firstInput = cleanInput(line)[0];

    if (commands[firstInput]) {
      commands[firstInput].callback();
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
