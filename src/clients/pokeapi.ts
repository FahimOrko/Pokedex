import { sleep } from "../utils/sleep.js";
import { cleanInput } from "../repl.js";
import { Cache } from "../pokecache.js";

export interface ShallowLocationsResult {
  name: string;
  url: string;
}

export interface LocationArea {
  name: string;
  url: string;
}

export interface LocationIndex {
  game_index: number;
  generation: LocationGeneration;
}

export interface LocationGeneration {
  name: string;
  url: string;
}

export interface LocationName {
  language: LocationLanguage;
  name: string;
}

export interface LocationLanguage {
  name: string;
  url: string;
}

export interface LocationRegion {
  name: string;
  url: string;
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: ShallowLocationsResult[];
};

export type Location = {
  areas: LocationArea[];
  game_indices: LocationIndex[];
  id: number;
  name: string;
  names: LocationName[];
  region: LocationRegion;
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private readonly cache = new Cache(60 * 60 * 500); // 5 minutes

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location`;
    const cahced = this.cache.get<ShallowLocations>(url);

    // Cahce hit
    if (cahced) {
      return cahced;
    }

    // Cahce miss
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const name = cleanInput(locationName)[0];
    const url = `${PokeAPI.baseURL}/location/${name}`;

    const cahced = this.cache.get<Location>(url);

    // Cache hit
    if (cahced) {
      return cahced;
    }

    // Cache miss

    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    const data = await res.json();
    this.cache.add(url, data);
    await sleep(500);
    return data;
  }
}
