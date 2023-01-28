export interface Game {
  url: string;
  pgn: string;
  time_control: string;
  end_time: string;
  rated: boolean;
  uuid: string;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result: string;
    username: string;
  };
  black: {
    rating: number;
    result: string;
    username: string;
  };
}

export type Games = Game[];
