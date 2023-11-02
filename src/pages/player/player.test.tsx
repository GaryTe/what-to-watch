import Player from './player';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';

describe('Test page "Player"', () => {

  test('Should render correctly page "Player"', () => {

    render(
      <BrowserRouter>
        <Player />
      </BrowserRouter>
    );

    expect(screen.getByRole('Play')).toBeInTheDocument();
    expect(screen.getByRole(/Full/)).toBeInTheDocument();
  });

  test('Pressing the "Play" button, change the button name with "Play" to "Pause".', async () => {

    render(
      <BrowserRouter>
        <Player />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByRole('Play'));
    expect(screen.getByRole('Pause')).toBeInTheDocument();
  });
});
