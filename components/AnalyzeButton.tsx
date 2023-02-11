'use client';

import { useEffect, useState } from 'react';
import { SearchIcon } from './Icons';

async function getAnalysis(pgn: string) {
  const res = await fetch('https://www.chesscompass.com/api2/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_data: pgn }),
  });

  console.log('hit');

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  return await res.json();
}

interface AnalyzeButtonProps {
  pgn: string;
}

export function AnalyzeButton({ pgn }: AnalyzeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const data = await getAnalysis(pgn);
    setIsLoading(false);
    window.open(`https://chesscompass.com/analyze/${data.game_id}`);
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
