import { State } from "../state.js";

export async function commandEncounter(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a location name");
    state.readline.prompt();
    return;
  }

  if (args.length > 1) {
    console.log("Please provide only one location name");
    state.readline.prompt();
    return;
  }

  const locationAreaName = args[0];
  state.readline.prompt();
}
