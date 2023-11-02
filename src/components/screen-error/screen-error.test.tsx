import ScreenError from './screen-error';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';


describe('Test render component "ScreenError"', () => {
  test('should render component "ScreenError"', () => {
    render(
      <BrowserRouter>
        <ScreenError />
      </BrowserRouter>
    );

    expect(screen.getByText('Page does not exist')).toBeInTheDocument();
  });
});
