import {useEffect, MutableRefObject, useRef} from 'react';
import { translateTime } from '../../util/util';

type PlayerControlsProps = {
  video: MutableRefObject<HTMLVideoElement | null>;
  reproduction: string;
}

function PlayerControls({video, reproduction}: PlayerControlsProps): JSX.Element {
  const refTime = useRef<HTMLDivElement | null>(null);
  const refToggler = useRef<HTMLDivElement | null>(null);
  const refProgress = useRef<HTMLProgressElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    if(refProgress.current && refToggler.current && refTime.current && video.current && isMounted) {
      const recordPlayer = video.current;
      const time = refTime.current;
      const toggler = refToggler.current;
      const progress = refProgress.current;

      if(reproduction === 'Play') {
        recordPlayer.addEventListener('loadeddata', () => {
          time.textContent = Math.round(recordPlayer.duration).toString();
        });
      }

      if(reproduction === 'Pause') {
        recordPlayer.addEventListener('timeupdate', () => {
          const dataValue = Math.round(recordPlayer.duration - recordPlayer.currentTime);
          time.textContent = translateTime(dataValue).toString();
          const value = 100 / recordPlayer.duration;
          toggler.style.left = `${recordPlayer.currentTime * value}%`;
          progress.value = recordPlayer.currentTime * value;
        });

      }
    }

    return () => {isMounted = false;};
  }, [video, reproduction]);

  return(
    <div className="player__controls-row">
      <div className="player__time">
        <progress className="player__progress" value="0" max="100" ref={refProgress}></progress>
        <div className="player__toggler" ref={refToggler}>Toggler</div>
      </div>
      <div className="player__time-value" ref={refTime}></div>
    </div>
  );
}

export default PlayerControls;
