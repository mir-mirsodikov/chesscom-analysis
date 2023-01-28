import { Game } from '@/model';

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

  return (await res.json());
}

export async function GameCard(game: Game) {
  const data = await getAnalysis(game.pgn);

  return (
    <div className="bg-slate-300 rounded-md p-4">
      <h1 className="text-2xl font-bold">{game.url}</h1>
      <h2 className="text-xl font-bold text-gray-500">{game.uuid}</h2>
      <a href={`https://chesscompass.com/analyze/${data.game_id}`}><button className="primary-button">Analyze</button></a>
    </div>
  );
}
