import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const { readline, commands } = initState();
  startREPL(readline, commands);
}

main();
