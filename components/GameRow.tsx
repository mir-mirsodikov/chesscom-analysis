import { Game } from '@/model';
import Link from 'next/link';
import { AnalyzeButton } from './AnalyzeButton';
import { EqualsIcon, MinusIcon, PlusIcon } from './Icons';

function getResults(game: Game): 'white' | 'black' | 'draw' {
  if (game.white.result === 'win') {
    return 'white';
  } else if (game.black.result === 'win') {
    return 'black';
  } else {
    return 'draw';
  }
}

function getScore(winner: 'white' | 'black' | 'draw', game: Game) {
  if (winner === 'white' && game.white.result === 'win') {
    return {
      white: '1',
      black: '0',
    };
  } else if (winner === 'black' && game.black.result === 'win') {
    return {
      white: '0',
      black: '1',
    };
  } else {
    return {
      white: '1/2',
      black: '1/2',
    };
  }
}

interface GameRowProps extends Game {
  username: string;
}

export async function GameRow(game: GameRowProps) {
  const results = getResults(game);

  const parseDate = (pgn: string) => {
    if (!pgn) {
      return 'Unknown date';
    }
    const date = pgn.slice(
      pgn.indexOf('[Date "') + 7,
      pgn.indexOf('[Date "') + 17,
    );

    const [year, month, day] = date.split('.');
    return `${month}/${day}/${year}`;
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTimeControl = (time_class: string, time_control: string) => {
    if (time_class === 'daily') {
      return parseInt(time_control.split('/')[1]) / 60 / 60 + ' hours';
    } else if (time_control.includes('+')) {
      const [first, second] = time_control.split('+');
      const firstNum = parseInt(first);
      const secondNum = parseInt(second);

      if (firstNum >= 60) {
        return firstNum / 60 + '|' + secondNum;
      }

      return firstNum + ' seconds |' + secondNum;
    } else {
      const num = parseInt(time_control);
      if (num >= 60) {
        return parseInt(time_control) / 60 + ' minutes';
      }
      return time_control + ' seconds';
    }
  };

  const winnerStyle = (player: string) => {
    if (player === results || results === 'draw') {
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
