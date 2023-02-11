import { Game } from '@/model';
import { getResults, getScore, parseDate, getTimeControl } from '@/utils/game';
import Link from 'next/link';
import { AnalyzeButton } from './AnalyzeButton';
import { EqualsIcon, MinusIcon, PlusIcon } from './Icons';

interface GameRowProps extends Game {
  username: string;
}

export async function GameRow(game: GameRowProps) {
  const results = getResults(game);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const winnerStyle = (player: string) => {
    if (player === results) {
      return 'border-2 border-green-600';
    }
  };

  const getPlayerColor = (player: string) => {
    if (player === 'white') {
      return 'bg-white';
    } else {
      return 'bg-gray-900';
    }
  };

  const getPlayer = (player: string) => {
    if (player === 'white') {
      return game.white;
    } else {
      return game.black;
    }
  };

  const getResultIcon = () => {
    if (results === 'draw') {
      return <EqualsIcon />;
    } else if (game[results].username === game.username) {
      return <PlusIcon />;
    } else {
      return <MinusIcon />;
    }
  };

  const showUser = (color: 'white' | 'black') => {
    if (game[color].username === game.username) {
      return 'hidden md:inline-block';
    }
  };

  return (
    <tr className="bg-slate-300 border-b">
      <td className="text-center p-4 w-1/6 hidden md:table-cell">
        <p className="text-regular md:text-lg font-semibold">
          {capitalizeFirstLetter(game.time_class)}
        </p>
        <p className="hidden md:block">
          {getTimeControl(game.time_class, game.time_control)}
        </p>
      </td>
      <td className="p-4 w-1/3">
        {['white', 'black'].map((player) => (
          <div key={player} className={showUser(player as 'white' | 'black')}>
            <div
              className={`${getPlayerColor(
                player,
              )} p-2 w-2 md:inline-block rounded-sm ${winnerStyle(
                player,
              )} hidden`}
            />
            <Link
              href={`/${getPlayer(player).username}`}
              className={'text-regular md:text-lg font-semibold'}
            >
              {' '}
              {getPlayer(player).username}{' '}
            </Link>
            <p className="inline-block">({getPlayer(player).rating})</p>
          </div>
        ))}
      </td>
      <td className="flex justify-center p-4">
        <div className="font-semibold hidden md:flex md:flex-col">
          <p>{getScore(results, game).white}</p>
          <p>{getScore(results, game).black}</p>
        </div>
        <div className="flex flex-col justify-center md:ml-2">
          <a href={game.url} target="_blank" rel="noreferrer">
            {getResultIcon()}
          </a>
        </div>
      </td>
      <td className="p-4 w-1/12">
        <AnalyzeButton pgn={game.pgn} />
      </td>
      <td className="p-4 hidden text-center md:table-cell">
        <p>{parseDate(game.pgn)}</p>
      </td>
    </tr>
  );
}
