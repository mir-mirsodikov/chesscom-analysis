// 'use client';
// import { useEffect } from 'react';
import { UserProfileCard } from '@/components/UserProfileCard';

interface UserInfo {
  avatar: string;
  name: string;
  last_online: string;
}

interface Game {
  url: string,
  pgn: string,
  time_control: string,
  end_time: string,
  rated: boolean,
  uuid: string,
  time_class: string,
  rules: string,
}

type GameList = Game[];

async function getUserInfo(username: string) {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  return (await res.json()) as Promise<UserInfo>;
}

async function getUserGames(username: string, year: number, month: number) {
  const res = await fetch(
    `https://api.chess.com/pub/player/${username}/games/${year}/${month < 10 ? '0' + month : month}`
  );

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  return (await res.json()).games as Promise<GameList>;
}

export default async function Page({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const data = await getUserInfo(params.username);
  const games = await getUserGames(params.username, 2023, 1);

  return (
    <main>
      <UserProfileCard {...{
        avatar: data.avatar,
        name: data.name,
        username: params.username,
      }} /> 
      {games.map((game) => (
        <div key={game.uuid}>
          <p>{game.uuid}</p>
        </div>
      ))}
      {games.length}
    </main>
  );
}
