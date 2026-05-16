import { State } from "../state.js";

export async function commandMap(state: State): Promise<void> {
  const nextURL = state.nextLocationsURL;
  const locations = await state.pokeAPI.fetchLocations(nextURL);
  for (const location of locations.results) {
    const areas = await state.pokeAPI.fetchLocation(location.name);
    for (const area of areas.areas) {
      console.log(area.name);
    }
  }
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = !locations.previous ? undefined : locations.previous;
  state.readline.prompt();
}
