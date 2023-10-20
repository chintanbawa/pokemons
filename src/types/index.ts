//Interfaces
export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IPokemonResponse {
  count: number;
  next: string;
  previous?: any;
  results: IPokemon[];
}

export interface IPokemon {
  name: string;
  url: string;
}

//Types
export type TPagination = {offset: number; limit: number};
