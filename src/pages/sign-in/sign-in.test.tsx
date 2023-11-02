import SignIn from './sign-in';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { store } from '../../store/store/store';

describe('Test page "SignIn"', () => {

  test('Should render correctly page "SignIn"', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email address', {selector: 'input'})).toBeInTheDocument();
    expect(screen.getByLabelText('Password', {selector: 'input'})).toBeInTheDocument();
  });

  test(`Enter value "Email address" in the input, returns entered value.
  Enter value "Password" in the input, activates the message.`, async () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.type(screen.getByLabelText('Email address', {selector: 'input'}), 'vlad@v.ru');
    expect(screen.getByDisplayValue('vlad@v.ru')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('Password', {selector: 'input'}), 'vv', {initialSelectionStart: 0});
    expect(screen.getByText('Параль состоит минимум из одной буквы и цифры.')).toBeInTheDocument();
  });
});
