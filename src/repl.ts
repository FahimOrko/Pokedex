import { Commands, Readline } from "./state.js";

export function cleanInput(input: string): string[] {
  const arr = input
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((s) => s !== "");
  return arr;
}

export function startREPL(rl: Readline, commands: Commands): void {
  rl.prompt();

  rl.on("line", (line) => {
    const firstInput = cleanInput(line)[0];

    if (commands[firstInput]) {
      commands[firstInput].callback({ readline: rl, commands });
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
