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


export const returnListNumber = (
  value: number
) =>{
  let counter = 0;
  const items = [];

  while(counter <= value) {
    counter += 1;

    items.push(counter);
  }
  return items;
};


export const chengeNoActive = (
  rating: number,
  text: string | undefined,
  chengeActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if(rating > 0 && text !== undefined && text.length > 50) {
    chengeActive(false);
  }

  if(rating === 0 || (text !== undefined && text.length <= 50)) {
    chengeActive(true);
  }
};

export const translateTime = (dataTime: number) => {
  let time = '';

  if(dataTime <= 60) {time = `-00:00:${dataTime}`;}

  if(dataTime > 60 && dataTime < 3600) {
    const minute = Math.round(dataTime / 60);

    time = `-00:${minute}:${dataTime}`;
  }

  if(dataTime >= 3600) {
    const minute = Math.round(dataTime / 60);
    const hour = Math.round(dataTime / 3600);

    time = `-${hour}:${minute}:${dataTime}`;
  }

  return time;
};
