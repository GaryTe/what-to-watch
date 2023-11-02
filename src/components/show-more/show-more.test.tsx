import {ShowMore} from './show-more';
import {Provider} from 'react-redux';
import {Action} from '@reduxjs/toolkit';
import {BrowserRouter} from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { PromoFilm } from '../../types/types-response/types-response';
import { ListFilm } from '../../types/types-response/types-response';
import {render, screen} from '@testing-library/react';


type State = {
  LIST_FILM: {
    counter: number;
    sortListFilm: Array<PromoFilm> | null;
  };
};

const middlewares = [thunk];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof thunk, Action>
>(middlewares);

describe('Test component "ShowMore"', () => {
  test('should render component "ShowMore"', () => {
    const store = mockStore({
      LIST_FILM: {
        counter: 3,
        sortListFilm: [{}, {}, {}, {}] as ListFilm
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ShowMore />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button',{name: 'Show more'})).toBeInTheDocument();
  });
  test('Not should render component "ShowMore"', () => {
    const store = mockStore({
      LIST_FILM: {
        counter: 3,
        sortListFilm: null
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ShowMore />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByRole('button', {name: 'Show more'})).not.toBeInTheDocument();
  });
});
