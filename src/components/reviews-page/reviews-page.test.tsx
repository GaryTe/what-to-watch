import ReviewsPage from './reviews-page';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { createAPI } from '../../server/api/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';


type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
      id: number;
      name: string;
  };
};

type State = {
  COMMENTS: {
    comments: Array<Comment>;
  };
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const state = mockStore({
  COMMENTS: {
    comments: [
      {
        comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
        date: 'Fri Oct 27 2023 11:29:39 GMT+0300 (Москва, стандартное время)',
        id: 1,
        rating: 8.9,
        user: {
          id: 4,
          name: 'Kate Muir'
        }
      }
    ]
  }
});

describe('Test component "ReviewsPage"', () => {
  test('should render correctly component "ReviewsPage"', () => {
    render(
      <Provider store={state}>
        <BrowserRouter>
          <ReviewsPage filmId={1}/>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.')).toBeInTheDocument();
    expect(screen.getByText('Kate Muir')).toBeInTheDocument();
    expect(screen.getByText('8.9')).toBeInTheDocument();
  });
});
