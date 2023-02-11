import { Game } from '@/model';
interface Score {
  white: string;
  black: string;
}

type Result = 'white' | 'black' | 'draw';

/**
 * Get the results of a game
 *
 * @param game The game to get the results from
 * @returns Who won the game, or if it was a draw
 */
export function getResults(game: Game): Result {
  if (game.white.result === 'win') {
    return 'white';
  } else if (game.black.result === 'win') {
    return 'black';
  } else {
    return 'draw';
  }
}

/**
 * Get the score of a game
 *  
 * @param winner The outcome of the game
 * @param game The game to get the score from
 * @returns The score of the game
 */
export function getScore(winner: Result, game: Game): Score {
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

/**
 * Get the date of the game
 * 
 * @param pgn PGN of the game
 * @returns Parsed date of the game
 */
export function parseDate(pgn: string): string {
  if (!pgn) {
    return 'Unknown date';
  }
  const date = pgn.slice(
    pgn.indexOf('[Date "') + 7,
    pgn.indexOf('[Date "') + 17,
  );

  const [year, month, day] = date.split('.');
  return `${month}/${day}/${year}`;
}

/**
 * Get the parsed out time control of the game
 * 
 * @param timeClass Time class of the game
 * @param timeControl Time control of the game
 * @returns Parsed time control
 */
export function getTimeControl(
  timeClass: string,
  timeControl: string,
): string {
  if (timeClass === 'daily') {
    return parseInt(timeControl.split('/')[1]) / 60 / 60 + ' hours';
  } else if (timeControl.includes('+')) {
    const [first, second] = timeControl.split('+');
    const firstNum = parseInt(first);
    const secondNum = parseInt(second);

    if (firstNum >= 60) {
      return firstNum / 60 + '|' + secondNum;
    }

    return firstNum + ' seconds |' + secondNum;
  } else {
    const num = parseInt(timeControl);
    if (num >= 60) {
      return parseInt(timeControl) / 60 + ' minutes';
    }
    return timeControl + ' seconds';
  }
}
