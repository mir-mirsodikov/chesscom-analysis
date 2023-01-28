import { GameCard } from '@/components/GameCard';
import { UserProfileCard } from '@/components/UserProfileCard';
import { Games, UserInfo } from '@/model';

async function getUserInfo(username: string) {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  return (await res.json()) as Promise<UserInfo>;
}

async function getUserGames(username: string, year: number, month: number) {
  const res = await fetch(
    `https://api.chess.com/pub/player/${username}/games/${year}/${
      month < 10 ? '0' + month : month
    }`,
    {
      cache: 'no-cache',
    },
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
      <UserProfileCard
        {...{
          avatar: data.avatar,
          name: data.name,
          username: params.username,
          last_online: data.last_online,
        }}
      />
      <div className="my-8">
        <table className="table-auto w-1/2 m-auto">
          <thead className="border-b-2 border-slate-500">
            <tr>
              <th>Type</th>
              <th>Players</th>
              <th>Result</th>
              <th>Analyze</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="">
            {games.reverse().map((game) => (
              // @ts-expect-error Server Component
              <GameCard {...game} key={game.uuid} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
