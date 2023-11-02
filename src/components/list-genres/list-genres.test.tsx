import ListGenres from './list-genres';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Action} from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../server/api/api';
import {render, screen, fireEvent} from '@testing-library/react';


type State = {
  LIST_FILM: {filter: string};
}

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  LIST_FILM: {filter: 'All genres'}
});

describe('Test component "ListGenres"', () => {
  test('should render correctly component "ListGenres"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ListGenres/>
        </BrowserRouter>
      </Provider>
    );

    const liElement = screen.getAllByRole('link');
    liElement.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test(`Click on the button component "ListGenres",
  return action "LIST_FILM/filteringListFilm".`, () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ListGenres/>
        </BrowserRouter>
      </Provider>
    );

    document.addEventListener('click', () => {
      store.dispatch({type: 'filteringListFilm'});
    });

    fireEvent(screen.getByText('All genres'),
      new Event('click',{
        bubbles: true,
        cancelable: true
      })
    );

    const action = store.getActions()[0];
    expect(action.type).toBe('LIST_FILM/filteringListFilm');
  });
});
