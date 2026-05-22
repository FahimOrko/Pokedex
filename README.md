# Pokedex - An Interactive CLI Pokémon Explorer

A command-line interface (CLI) application built with **TypeScript** that allows you to explore Pokémon locations, encounter Pokémon, catch them, and maintain your personal Pokédex using the official [PokéAPI](https://pokeapi.co/).

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
  - [Commands](#commands)
  - [Examples](#examples)
- [System Architecture](#system-architecture)
- [How It Works](#how-it-works)
- [Development](#development)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Caching System](#caching-system)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This Pokedex application is an interactive CLI tool that simulates the experience of exploring the Pokémon world. Users can:

- Browse location maps and areas
- Encounter random Pokémon in different locations
- Attempt to catch Pokémon with probabilistic success rates
- Build and view their personal Pokédex collection
- Inspect detailed information about caught Pokémon

The application leverages the public **PokéAPI** to fetch real Pokémon data and locations, providing an authentic Pokémon exploration experience directly from the terminal.

---

## Features

✨ **Key Features:**

- **Interactive REPL Interface** - User-friendly command-line interface with prompt-based input
- **Location Browsing** - Explore different regions and locations across the Pokémon world
- **Pokémon Encounters** - Randomly encounter Pokémon when exploring specific areas
- **Catch Mechanics** - Probabilistic catch system based on Pokémon base experience values
- **Personal Pokédex** - Track and manage your collection of caught Pokémon
- **Pokémon Inspection** - View detailed stats and information about your caught Pokémon
- **Intelligent Caching** - Reduces API calls with a 5-minute response cache
- **Error Handling** - Robust error handling with graceful error messages
- **Type-Safe** - Built with TypeScript for type safety and better developer experience

---

## Technology Stack

- **Language**: TypeScript 6.0.2
- **Runtime**: Node.js with ES Modules
- **Testing Framework**: Vitest 4.1.4
- **External API**: PokéAPI v2
- **CLI Tools**: Node.js `readline` module
- **HTTP Client**: Fetch API

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FahimOrko/Pokedex.git
   cd Pokedex
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the TypeScript code:**
   ```bash
   npm run build
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

   Or use the combined build & run command:
   ```bash
   npm run dev
   ```

---

## Usage

### Commands

Once the application is running, you'll see the prompt:

```
Pokedex >
```

Enter any of the following commands:

#### **help**
Displays all available commands and their usage.

```
Pokedex > help
```

#### **map**
Displays the first page of Pokémon locations. Shows location names and pagination info.

```
Pokedex > map
```

#### **mapb**
Displays the previous page of Pokémon locations. Navigate backwards through the location list.

```
Pokedex > mapb
```

#### **explore [location-name]**
Explores a specific location and displays Pokémon that appear there. Randomly encounters Pokémon in that area.

```
Pokedex > explore pallet-town
```

**Output example:**
```
Exploring pallet-town...
Found Pokemon:
- pikachu
- bulbasaur
- charmander
```

#### **catch [pokemon-name]**
Attempts to catch a Pokémon by name. Success is based on the Pokémon's base experience value.

```
Pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu was caught!
You can now inspect it with the inspect command.
```

#### **pokedex**
Displays your current Pokédex - a list of all Pokémon you have successfully caught.

```
Pokedex > pokedex
Your Pokédex:
- pikachu
- bulbasaur
- charmander
```

#### **inspect [pokemon-name]**
Shows detailed information about a Pokémon in your Pokédex, including stats, types, abilities, and more.

```
Pokedex > inspect pikachu
Name: pikachu
ID: 25
Height: 4
Weight: 60
Base Experience: 112
...
```

#### **exit**
Exits the Pokedex application.

```
Pokedex > exit
```

### Examples

**Basic Session Example:**

```bash
$ npm start

Pokedex > help
[List of all commands displayed]

Pokedex > map
Locations:
- pallet-town
- viridian-city
- pewter-city
...

Pokedex > explore pallet-town
Exploring pallet-town...
Found Pokemon: pikachu, bulbasaur, charmander

Pokedex > catch pikachu
Throwing a Pokeball at pikachu...
pikachu was caught!

Pokedex > pokedex
Your Pokédex:
- pikachu

Pokedex > inspect pikachu
Name: pikachu
Type: electric
Height: 4
Weight: 60

Pokedex > exit
```

---

## System Architecture

The Pokedex application follows a modular architecture with clear separation of concerns:

```
src/
├── main.ts                 # Entry point
├── repl.ts                 # Read-Eval-Print Loop handler
├── state.ts                # Application state management
├── pokecache.ts            # Caching system
├── commands/               # CLI command implementations
│   ├── command.ts          # Command registry
│   ├── command_map.ts      # Map navigation
│   ├── command_mapb.ts     # Previous map page
│   ├── command_explore.ts  # Location exploration
│   ├── command_catch.ts    # Pokémon catching
│   ├── command_inspect.ts  # Pokémon inspection
│   ├── command_pokedex.ts  # Pokédex viewing
│   ├── command_help.ts     # Help display
│   └── command_exit.ts     # Application exit
├── pokeapi/                # API integration
│   ├── client.ts           # API client implementation
│   ├── types.ts            # Type definitions
│   ├── pokemon.t.ts        # Pokémon type definitions
│   └── index.ts            # Module exports
└── utils/                  # Utility functions
    ├── catchChance.ts      # Catch probability logic
    └── sleep.ts            # Async delay helper
```

---

## How It Works

### 1. **Initialization**
When the application starts, it:
- Initializes a Node.js `readline` interface for CLI interaction
- Creates a command registry with all available commands
- Sets up a PokéAPI client instance
- Initializes an empty Pokédex (object for storing caught Pokémon)
- Starts the REPL loop

### 2. **REPL Loop**
The Read-Eval-Print Loop:
- Displays the prompt: `Pokedex > `
- Waits for user input
- Parses the command and arguments (normalized to lowercase)
- Routes to the appropriate command handler
- Executes the command and displays output
- Returns to the prompt

### 3. **API Communication**
When a command needs data:
- Constructs the appropriate PokéAPI endpoint URL
- Checks the cache for existing data
- If cached data exists and isn't expired, returns it immediately
- If no cache hit, makes an HTTP request to PokéAPI
- Stores the response in the cache
- Returns the data to the command handler

### 4. **State Management**
The application state includes:
- **readline**: The CLI interface for user interaction
- **commands**: Registered command handlers
- **pokeAPI**: Client for API calls
- **pokedex**: Your collection of caught Pokémon
- **nextLocationsURL** & **prevLocationsURL**: Pagination URLs for location browsing

### 5. **Catch Mechanics**
When catching a Pokémon:
- Retrieves Pokémon data from PokéAPI
- Calculates catch probability based on base experience
- Generates a random outcome
- If successful, adds Pokémon to your Pokédex
- Updates the UI with the result

---

## System Components

### **REPL (src/repl.ts)**
- Handles user input parsing and normalization
- Parses command-line input into command and arguments
- Routes commands to their handlers
- Manages the prompt display

### **State (src/state.ts)**
- Defines the global application state structure
- Initializes all state components
- Provides type definitions for state shape

### **Commands (src/commands/)**
- Individual command implementations
- Each command is async and receives the application state
- Commands can read/modify state and display output
- Follows the `CLICommand` interface

### **PokeAPI Client (src/pokeapi/client.ts)**
- Communicates with the official PokéAPI
- Fetches locations, areas, and Pokémon data
- Handles HTTP requests and JSON parsing
- Integrates with the caching system

### **Caching System (src/pokecache.ts)**
- Stores API responses to reduce network calls
- Implements TTL (Time-To-Live) expiration
- Generic type-safe cache implementation
- Reduces latency and API rate limit concerns

### **Utilities (src/utils/)**
- **catchChance**: Probabilistic logic for successful catches
- **sleep**: Async delay for UI animations

---

## API Integration

### PokéAPI Overview

This application integrates with [PokéAPI](https://pokeapi.co/), a free, open-source Pokémon API.

**Base URL:** `https://pokeapi.co/api/v2`

### Endpoints Used

1. **Locations Endpoint**
   ```
   GET /location
   GET /location?offset=X&limit=Y
   ```
   - Paginated list of Pokémon locations
   - Returns location names and URLs

2. **Location-Area Endpoint**
   ```
   GET /location-area/{areaName}
   ```
   - Details about a specific location area
   - Includes Pokémon encounters in that area

3. **Pokémon Endpoint**
   ```
   GET /pokemon/{pokemonName}
   ```
   - Comprehensive Pokémon data
   - Includes stats, types, sprites, base experience, etc.

---

## Caching System

The application implements an intelligent caching mechanism to optimize performance:

### **Cache Features**
- **TTL Duration**: 5 hours (18,000 seconds) - configurable per request
- **Generic Storage**: Type-safe cache for any data type
- **Key-Value Pattern**: URLs are used as cache keys
- **Automatic Expiration**: Expired entries are automatically invalidated

### **Benefits**
- Reduces API calls to PokéAPI
- Improves response time for frequently accessed data
- Respects API rate limits
- Minimizes latency during gameplay

### **Example**
```typescript
// First call - API request
const data = await pokeAPI.fetchLocations();

// Second call - Cache hit (within 5 hours)
const data = await pokeAPI.fetchLocations(); // Returns instantly from cache
```

---

## Development

### Build

Compile TypeScript to JavaScript:
```bash
npm run build
```

This generates JavaScript files in the `dist/` directory.

### Development Mode

Build and run with automatic TypeScript compilation:
```bash
npm run dev
```

### Testing

Run the test suite using Vitest:
```bash
npm test
```

### Logging Output

Combine output and save to log file:
```bash
npm run tee
```

Outputs to both console and `repl.log` file.

---

## Project Structure

### **Source Files (src/)**

```
src/
├── main.ts                    # Application entry point
├── repl.ts                    # REPL implementation
├── state.ts                   # State initialization and types
├── pokecache.ts               # Caching implementation
├── commands/
│   ├── command.ts             # Command registry
│   ├── command_map.ts         # "map" command
│   ├── command_mapb.ts        # "mapb" command
│   ├── command_explore.ts     # "explore" command
│   ├── command_catch.ts       # "catch" command
│   ├── command_inspect.ts     # "inspect" command
│   ├── command_pokedex.ts     # "pokedex" command
│   ├── command_help.ts        # "help" command
│   └── command_exit.ts        # "exit" command
├── pokeapi/
│   ├── client.ts              # API client class
│   ├── index.ts               # Module exports
│   ├── types.ts               # Type definitions
│   └── pokemon.t.ts           # Pokémon types
└── utils/
    ├── catchChance.ts         # Catch probability logic
    └── sleep.ts               # Async delay utility
```

### **Configuration Files**

- **tsconfig.json** - TypeScript compiler configuration
- **package.json** - Project metadata and dependencies
- **.gitignore** - Git ignore patterns

### **Build Output (dist/)**

Compiled JavaScript output (generated by `npm run build`)

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your code:
- Follows TypeScript best practices
- Is properly typed
- Includes error handling
- Is tested with Vitest

---

## License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## Acknowledgments

- **PokéAPI** - For providing the free, comprehensive Pokémon data API
- **Pokémon** - Pokémon is a trademark of The Pokémon Company International
- Built with **TypeScript** and **Node.js**

---

## Support & Issues

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/FahimOrko/Pokedex/issues)
2. Open a new issue with a detailed description
3. Include steps to reproduce the problem
4. Provide environment details (Node.js version, OS, etc.)

---

## Roadmap

Potential future enhancements:
- [ ] Pokémon trading functionality
- [ ] Battle system between caught Pokémon
- [ ] Leveling and experience system
- [ ] Save/load game state to file
- [ ] Web UI version
- [ ] Multiplayer capabilities
- [ ] Advanced filtering and search
- [ ] Pokémon evolution tracking

---

## Quick Reference

### Command Cheat Sheet

| Command | Usage | Description |
|---------|-------|-------------|
| `help` | `help` | Show all commands |
| `map` | `map` | Show next locations |
| `mapb` | `mapb` | Show previous locations |
| `explore` | `explore <location>` | Find Pokémon in a location |
| `catch` | `catch <pokemon>` | Attempt to catch a Pokémon |
| `pokedex` | `pokedex` | View your caught Pokémon |
| `inspect` | `inspect <pokemon>` | View Pokémon details |
| `exit` | `exit` | Exit the application |

---

**Happy Pokémon Hunting! 🎮✨**
