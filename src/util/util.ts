import dayjs from 'dayjs';
import { ListFilm } from '../types/types-response/types-response';
import { Genre, NameFilter, ScoreFilm } from '../const/const';

export const filterFilmsByGenre = (listFilm: ListFilm, nameFilter: string): ListFilm => {
  let filteredListFilm: ListFilm = [];
  switch (nameFilter) {
    case Genre.Comedies:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter.Comedies);
      break;
    case Genre.Crime:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter.Crime);
      break;
    case Genre.Documentary:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter.Documentary);
      break;
    case Genre.Dramas:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter.Dramas);
      break;
    case Genre.Horror:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter.Horror);
      break;
    case Genre.KidsFamily:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter['Kids & Family']);
      break;
    case Genre.Romance:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter.Romance);
      break;
    case Genre.SciFi:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter['Sci-Fi']);
      break;
    case Genre.Thrillers:
      filteredListFilm = listFilm.slice().filter((film) => film.genre === NameFilter.Thriller);
      break;
    default:
      filteredListFilm = listFilm;
      break;
  }

  return filteredListFilm;
};


export const getScoreFilm = (scoreFilm: number) => {
  if(scoreFilm < 3) {return ScoreFilm.Bad;}
  if(scoreFilm >= 3 && scoreFilm < 5) {return ScoreFilm.Normal;}
  if(scoreFilm >= 5 && scoreFilm < 8) {return ScoreFilm.Good;}
  if(scoreFilm >= 8 && scoreFilm < 10) {return ScoreFilm.VeryGood;}
  if(scoreFilm >= 10) {return ScoreFilm.Awesome;}
};


export const gettingTranslatedDate = (date: string) => dayjs (date).format ('MMMM DD, YYYY');
