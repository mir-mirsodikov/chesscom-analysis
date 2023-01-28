import { Game } from '@/model';
import Link from 'next/link';

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

export async function GameCard(game: Game) {
  const data = await getAnalysis(game.pgn);
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

  return (
    <div className="bg-slate-300 rounded-md p-4 w-1/2 m-auto">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">
          {capitalizeFirstLetter(game.time_class)} -{' '}
          {getTimeControl(game.time_class, game.time_control)}
        </p>
        <p>{parseDate(game.pgn)}</p>
      </div>
      <div>
        <div>
          <div className="bg-white p-2 w-2 inline-block rounded-sm" />
          <Link
            href={`/${game.white.username}`}
            className={'text-lg font-semibold'}
          >
            {' '}
            {game.white.username}{' '}
          </Link>
          <p className="inline-block">{game.white.rating}</p>
        </div>
        <div>
          <div className="bg-gray-900 p-2 w-2 inline-block rounded-sm" />
          <Link
            href={`/${game.black.username}`}
            className={'text-lg font-semibold'}
          >
            {' '}
            {game.black.username}{' '}
          </Link>
          <p className="inline-block">{game.black.rating}</p>
        </div>
      </div>
      <div></div>
      <h1 className="text-2xl font-bold"></h1>
      <a href={`https://chesscompass.com/analyze/${data.game_id}`}>
        <button className="primary-button">Analyze</button>
      </a>
    </div>
  );
}
