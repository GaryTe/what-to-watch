import PlayerControls from './player-controls';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('Test component "PlayerControls"', () => {
  test('should render correctly page "HeaderPromoFilm"', () => {
    render(
      <BrowserRouter>
        <PlayerControls video={{current: null}} reproduction={'Play'}/>
      </BrowserRouter>
    );

    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
