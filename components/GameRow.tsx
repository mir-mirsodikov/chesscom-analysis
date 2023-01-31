import { Game } from '@/model';
import Link from 'next/link';
import { EqualsIcon, MinusIcon, PlusIcon } from './Icons';

async function getAnalysis(pgn: string) {
  const res = await fetch('https://www.chesscompass.com/api2/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_data: pgn }),
  });

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  return await res.json();
}

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
  // const data = await getAnalysis(game.pgn);
  const results = getResults(game);

  const parseDate = (pgn: string) => {
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
      return (
        parseInt(time_control.split('+')[0]) / 60 +
        '|' +
        time_control.split('+')[1]
      );
    } else {
      return parseInt(time_control) / 60 + ' minutes';
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

  return (
    <tr className="bg-slate-300 border-b">
      <td className="text-center p-4">
        <p className="text-lg font-semibold">
          {capitalizeFirstLetter(game.time_class)}
        </p>
        <p>{getTimeControl(game.time_class, game.time_control)}</p>
      </td>
      <td className="p-4 w-1/4">
        {['white', 'black'].map((player) => (
          <div key={player}>
            <div
              className={`${getPlayerColor(
                player,
              )} p-2 w-2 inline-block rounded-sm ${winnerStyle(player)}`}
            />
            <Link
              href={`/${getPlayer(player).username}`}
              className={'text-lg font-semibold'}
            >
              {' '}
              {getPlayer(player).username}{' '}
            </Link>
            <p className="inline-block">({getPlayer(player).rating})</p>
          </div>
        ))}
      </td>
      <td className="flex justify-center p-4">
        <div className="font-semibold">
          <p>{getScore(results, game).white}</p>
          <p>{getScore(results, game).black}</p>
        </div>
        <div className='flex flex-col justify-center ml-2'>{getResultIcon()}</div>
      </td>
      <td className="p-4">
        <a
          href={`https://chesscompass.com/analyze/${''}`}
          target={'_blank'}
          rel="noreferrer"
        >
          <button className="primary-button">Analyze</button>
        </a>
      </td>
      <td className="p-4 text-center">
        <p>{parseDate(game.pgn)}</p>
      </td>
    </tr>
  );
}
