import VideoPreview from './video-preview';
import {BrowserRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('Test component "VideoPreview"', () => {
  test('should render component "VideoPreview"', () => {
    render(
      <BrowserRouter>
        <VideoPreview valueVideo="https://some-link" id={1}/>
      </BrowserRouter>
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
