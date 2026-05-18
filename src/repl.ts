import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const arr = input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((s) => s !== "");
  return arr;
}

export async function startREPL(state: State): Promise<void> {
  try {
    const rl = state.readline;
    const commands = state.commands;

    rl.prompt();

    rl.on("line", (line) => {
      const firstInput = cleanInput(line)[0];
      const args = cleanInput(line).slice(1);

      if (commands[firstInput]) {
        commands[firstInput].callback(state, ...args);
      } else {
        console.log("Unknown command");
        rl.prompt();
      }
    });
  } catch (error) {
    console.error("An error occurred in the REPL:", error);
    process.exit(1);
  }
}
