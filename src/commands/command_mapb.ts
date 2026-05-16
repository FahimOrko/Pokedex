import { State } from "../state.js";

export async function commandMapBack(state: State): Promise<void> {
  const prevURL = state.prevLocationsURL;
  const locations = await state.pokeAPI.fetchLocations(prevURL);
  for (const location of locations.results) {
    const areas = await state.pokeAPI.fetchLocation(location.name);
    for (const area of areas.areas) {
      console.log(area.name);
    }
  }
  state.readline.prompt();
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = !locations.previous ? undefined : locations.previous;
}
