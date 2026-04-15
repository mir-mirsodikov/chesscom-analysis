'use client';
import { Games } from '@/model';
import { useEffect, useState } from 'react';
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
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    if (res.status === 404) {
      return [];
    }
    throw new Error(`Unable to load games for "${username}"`);
  }

  return (await res.json()).games as Games;
}

export function GameList({
  username,
  year: initYear,
  month: initMonth,
}: GameListProps) {
  const [games, setGames] = useState<Games>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const year = initYear ? initYear : new Date().getFullYear();
  const month = initMonth ? initMonth : new Date().getMonth() + 1;

  useEffect(() => {
    let isCancelled = false;

    const loadGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const loadedGames = await getUserGames(username, year, month);
        if (!isCancelled) {
          setGames(loadedGames);
        }
      } catch (e) {
        if (!isCancelled) {
          setGames([]);
          setError(
            e instanceof Error
              ? e.message
              : `Unable to load games for "${username}"`,
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadGames();

    return () => {
      isCancelled = true;
    };
  }, [username, year, month]);

  const NoGames = () => {
    if (games.length == 0)
      return (
        <p className="text-center font-bold text-gray-200 p-4">
          No games found for {month}/{year}
        </p>
      );

    return null;
  };

  return (
    <div className="bg-slate-500 my-8 pt-4 w-full xl:w-2/3 lg:w-3/4 m-auto rounded-md overflow-x-hidden">
      {isLoading && (
        <p className="text-center font-bold text-gray-200 p-4">Loading games...</p>
      )}
      {error && (
        <p className="text-center font-bold text-red-300 p-4">{error}</p>
      )}
      <table className="table-auto w-full xl:m-auto rounded-md ">
        <thead className="border-b-2 border-slate-500 bg-slate-500 text-gray-200">
          <tr className="hidden md:table-row">
            <th>Type</th>
            <th>Players</th>
            <th>Result</th>
            <th>Analyze</th>
            <th className="hidden md:table-cell">Date</th>
          </tr>
        </thead>
        <tbody className="">
          {[...games].reverse().map((game) => (
            game.rules === 'chess' && <GameRow {...{ ...game, username }} key={game.uuid} />
          ))}
        </tbody>
      </table>
      <NoGames />
    </div>
  );
}
