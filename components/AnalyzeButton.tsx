'use client';

import { SearchIcon } from './Icons';

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

interface AnalyzeButtonProps {
  pgn: string;
}

export function AnalyzeButton({ pgn }: AnalyzeButtonProps) {
  const handleClick = async () => {
    const data = await getAnalysis(pgn);

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      window.location.href = `https://chesscompass.com/analyze/${data.data.game_id}`;
      return;
    }

    window.open(`https://chesscompass.com/analyze/${data.data.game_id}`);
  };

  return (
    <>
      <button onClick={handleClick} className="primary-button hidden md:block">
        Analyze
      </button>
      <button onClick={handleClick} className="primary-button md:hidden">
        <SearchIcon />
      </button>
    </>
  );
}
