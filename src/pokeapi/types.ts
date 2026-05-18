export interface EncounterArea {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: EncounterLocation;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface VersionDetail {
  rate: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface EncounterLocation {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
}

export interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

export interface Method {
  name: string;
  url: string;
}

export interface Version2 {
  name: string;
  url: string;
}

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
