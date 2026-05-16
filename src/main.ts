import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  try {
    await startREPL(initState());
  } catch (error) {
    console.error("An error occurred in the main function:", error);
    process.exit(1);
  }
}

main();
