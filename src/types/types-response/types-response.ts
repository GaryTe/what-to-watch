export type PromoFilm = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: [string];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
  };

export type ListFilm = PromoFilm[];

export type Comments = [{
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
  id: number;
  name: string;
  };}];

export type statusAuthorization = {
    avatarUrl: string;
    email: string;
    id: number;
    name: string;
    token: string;
    };
