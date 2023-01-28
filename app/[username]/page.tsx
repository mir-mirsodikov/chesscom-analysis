import { GameCard } from '@/components/GameCard';
import { UserProfileCard } from '@/components/UserProfileCard';
import { Games, UserInfo } from '@/model';

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

  return (await res.json()).games as Promise<Games>;
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
        last_online: data.last_online,
      }} /> 
      <div className='space-y-4 m-4'>
        {games.map((game) => (
          /* @ts-expect-error Server Component */
          <GameCard {...game} key={game.uuid} />
        ))}
      </div>
      {games.length}
    </main>
  );
}
