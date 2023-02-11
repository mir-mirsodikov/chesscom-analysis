import { Game } from '@/model';

/**
 * Get the results of a game
 *
 * @param game The game to get the results from
 * @returns Who won the game, or if it was a draw
 */
export function getResults(game: Game): 'white' | 'black' | 'draw' {
  if (game.white.result === 'win') {
    return 'white';
  } else if (game.black.result === 'win') {
    return 'black';
  } else {
    return 'draw';
  }
}

export function getScore(winner: 'white' | 'black' | 'draw', game: Game) {
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

export function getTimeControl(
  time_class: string,
  time_control: string,
): string {
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
}
