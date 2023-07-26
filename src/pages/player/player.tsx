import {useLocation, useNavigate} from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import PlayerControls from '../../components/player-controls/player-controls';

type State = {
  videoLink: string;
  path: string;
}

type Location = {
  state: State | null;
  key: string;
}

function Player(): JSX.Element {
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const refDiv = useRef<HTMLDivElement | null>(null);
  const [nameSize, setNameSize] = useState('Full screen');
  const [reproduction, setReproduction] = useState('Play');

  const navigate = useNavigate();

  const {state} = useLocation() as Location;

  useEffect(() => {
    let isMounted = true;

    if(refVideo.current && refDiv.current && isMounted) {
      const video = refVideo.current;

      if(nameSize === 'Small screen') {
        video.style.width = '50%';
        video.style.height = '50%';
        refDiv.current.style.backgroundColor = 'black';
      }
      if(nameSize === 'Full screen') {video.style.width = '100%'; video.style.height = '100%';}

      if(reproduction === 'Pause') {
        video.play();
      }

      if(reproduction === 'Play') {
        video.pause();
      }

      video.addEventListener('ended', () => {
        setReproduction('Play');
      });
    }

    return () => {isMounted = false;};
  }, [nameSize, reproduction]);

  return(
    <div className="player" ref={refDiv}>
      {state && <video src={state.videoLink} className="player__video" poster="img/player-poster.jpg" ref={refVideo}></video>}

      <button
        type="button"
        className="player__exit"
        onClick={() => {
          if(reproduction === 'Pause') {
            setReproduction('Play');
            state?.path && navigate(state.path);
          } else {
            state?.path && navigate(state.path);
          }
        }}
      >
        Exit
      </button>

      <div className="player__controls">
        <PlayerControls video={refVideo} reproduction={reproduction}/>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => reproduction === 'Play' ? setReproduction('Pause') : setReproduction('Play')}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              {reproduction === 'Play' ? <use xlinkHref="#play-s"></use> : <use xlinkHref="#pause"></use>}
            </svg>
            <span>{reproduction}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => nameSize === 'Full screen' ? setNameSize('Small screen') : setNameSize('Full screen')}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>{nameSize}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
