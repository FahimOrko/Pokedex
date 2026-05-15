import { createInterface } from "node:readline";
import process from "node:process";

export function cleanInput(input: string): string[] {
  const arr = input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((s) => s !== "");
  return arr;
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();
  rl.on("line", (line) => {
    if (line) {
      const firstWord = cleanInput(line)[0];
      console.log(`Your command was: ${firstWord}`);
    }
    rl.prompt();
  });
}
