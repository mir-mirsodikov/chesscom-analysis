import { Games } from '@/model';
import { GameRow } from './GameRow';

interface GameListProps {
  username: string;
  year?: number;
  month?: number;
}

async function getUserGames(username: string, year: number, month: number) {
  const res = await fetch(
    `https://api.chess.com/pub/player/${username}/games/${year}/${
      month < 10 ? '0' + month : month
    }`,
    {
      cache: 'reload',
    },
  );

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  return (await res.json()).games as Promise<Games>;
}

export async function GameList({
  username,
  year: initYear,
  month: initMonth,
}: GameListProps) {
  const year = initYear ? initYear : new Date().getFullYear();
  const month = initMonth ? initMonth : new Date().getMonth() + 1;
  const games = await getUserGames(username, year, month);

  const NoGames = () => {
    if (games.length == 0)
      return (
        <p className="text-center p-4">
          No games found for {month}/{year}
        </p>
      );

    return null;
  };

  return (
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
      <NoGames />
    </div>
  );
}
