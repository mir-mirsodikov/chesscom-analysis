<h1>Chess.com Games Analysis</h1>

- [Overview](#overview)
- [Documentation](#documentation)
  - [Flow](#flow)
  - [Chess.com API](#chesscom-api)
    - [Player Profile](#player-profile)
    - [Player Games (Year and Month)](#player-games-year-and-month)
  - [ChessCompass](#chesscompass)
    - [Publish Chess.com Game](#publish-chesscom-game)
      - [Request](#request)
      - [Response](#response)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Checkout the repository](#checkout-the-repository)
    - [Install dependencies](#install-dependencies)
- [Build and Run](#build-and-run)
  - [Commands](#commands)


# Overview

Connect Chess.com and ChessCompass to analyze your games for free.

# Documentation

## Flow

1. User enters their Chess.com username.
2. The app uses the provided username and fetches the user's profile and games from the [Chess.com API](#chesscom-api).
3. Each game from the Chess.com API response has a `pgn` property. The app uses the `pgn` property to publish the game to [ChessCompass](#chesscompass).
4. Once the game has been published, an ID is returned from ChessCompass. The app uses the ID to redirect the user to the game analysis page on ChessCompass, with the URL pattern of `https://chesscompass.com/analyze/{game_id}`.

## Chess.com API

> https://www.chess.com/news/view/published-data-api

### Player Profile

> https://api.chess.com/pub/player/{username}

### Player Games (Year and Month)

> https://api.chess.com/pub/player/{username}/games/{year}/{month}

## ChessCompass

### Publish Chess.com Game

> https://chesscompass.com/api2/games

#### Request

```json
{
  "game_data": "<game pgn from a Chess.com game>"
}
```

#### Response
```json
{
  "game_id": "some_uuid"
}
```


# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

### Checkout the repository

```bash
git clone https://github.com/mir-mirsodikov/chesscom-analysis
```

### Install dependencies

```bash
npm install
```

# Build and Run

## Commands

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Run the app in development mode. |
| `npm run build` | Build the app for production.    |
| `npm start`     | Run the app in production mode.  |

