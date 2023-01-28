import { DatePicker } from '@/components/DatePicker';
import { GameRow } from '@/components/GameRow';
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
  searchParams
}: {
  params: {
    username: string;
  };
  searchParams?: {
    year: string;
    month: string;
  }
}) {
  const year = searchParams?.year ? parseInt(searchParams.year) : new Date().getFullYear();
  const month = searchParams?.month ? parseInt(searchParams.month) : new Date().getMonth() + 1;

  const data = await getUserInfo(params.username);
  const games = await getUserGames(params.username, year, month);

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
      <DatePicker {...{
        year,
        month,
        username: params.username
      }} />
      <div className="my-8">
        <table className="table-auto xl:w-2/3 w-full xl:m-auto">
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
              <GameRow {...game} key={game.uuid} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
