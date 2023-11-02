import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import { createAPI } from '../../server/api/api';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import AddReview from './add-review';
import {render, screen, fireEvent} from '@testing-library/react';


jest.mock('../../components/header/header', () =>
  function MockHeader() {
    return (
      <div data-testid="mockHeader">
      Заголовок!!!
      </div>
    );
  }
);

type DataFilm = {
  id: number;
  previewImage: string;
  name: string;
  posterImage: string;
}

type Storage ={
  DETAILS_FILM: {
    descriptionFilm: DataFilm;
  };
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  Storage,
  Action<string>,
  ThunkDispatch<Storage, typeof api, Action>
>(middlewares);

const storege = mockStore({
  DETAILS_FILM: {
    descriptionFilm: {
      id: 1,
      previewImage: 'img/the-grand-budapest-hotel.jpg',
      name: 'The Grand Budapest Hotel',
      posterImage: 'img/the-grand-budapest-hotel-poster.jpg'
    },
  }
});

describe('Test page "AddReview"', () => {

  test('should render correctly page "AddReview"', () => {

    render(
      <Provider store={storege}>
        <BrowserRouter>
          <AddReview/>
        </BrowserRouter>
      </Provider>
    );

    const imgElementsList = screen.getAllByAltText('The Grand Budapest Hotel');
    imgElementsList.forEach((element) => expect(element).toBeInTheDocument());

    expect(screen.getByText('Заголовок!!!')).toBeInTheDocument();
    expect(screen.getByText('Кнопка заблокирована.')).toBeInTheDocument();
  });

  test('Click on the button "Rating" and text input, unlock button.', () => {

    render(
      <Provider store={storege}>
        <BrowserRouter>
          <AddReview/>
        </BrowserRouter>
      </Provider>
    );

    const inputElementsList = screen.getAllByRole('radio', {name: /Rating/});
    fireEvent(inputElementsList[3],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement,
      {
        target: {
          value: 'Привет всем !!! Меня зовут Игорь. Этот фильм занимает твердую 4.'
        }
      }
    );

    expect(screen.getByText('Кнопка разблокирована.')).toBeInTheDocument();
  });
});
