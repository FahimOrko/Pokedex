import { sleep } from "../utils/sleep.js";
import { cleanInput } from "../repl.js";
import { Cache } from "../pokecache.js";
import { EncounterArea, Location, ShallowLocations } from "./types.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private readonly cache = new Cache(60 * 60 * 500); // 5 minutes

  constructor() {}

  // --------------------------------------------------------------------------------------------
  // Fetches a page of locations. If pageURL is not provided, it fetches the first page.
  // --------------------------------------------------------------------------------------------
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location`;
    const cahced = this.cache.get<ShallowLocations>(url);

    // ----------
    // Cahce hit
    // ----------
    if (cahced) {
      return cahced;
    }

    // ----------
    // Cahce miss
    // ----------
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    this.cache.add(url, data);
    return data;
  }
  // --------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------
  // Fetches the explored area data for a given location area name.
  // --------------------------------------------------------------------------------------------
  async fetchExploredArea(areaName: string): Promise<EncounterArea> {
    const url = `${PokeAPI.baseURL}/location-area/${areaName}`;
    const cahced = this.cache.get<EncounterArea>(url);

    // ----------
    // Cahce hit
    // ----------
    if (cahced) {
      return cahced;
    }

    // ----------
    // Cahce miss
    // ----------
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    const data = await res.json();
    this.cache.add(url, data);
    return data;
  }
  // --------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------
  // Fetches the location data for a given location name
  // --------------------------------------------------------------------------------------------
  async fetchLocation(locationName: string): Promise<Location> {
    const name = cleanInput(locationName)[0];
    const url = `${PokeAPI.baseURL}/location/${name}`;

    const cahced = this.cache.get<Location>(url);

    // ----------
    // Cahce hit
    // ----------
    if (cahced) {
      return cahced;
    }

    // ----------
    // Cahce miss
    // ----------
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    this.cache.add(url, data);
    await sleep(500);
    return data;
  }
  // --------------------------------------------------------------------------------------------
}
