import {useEffect, useRef} from 'react';

type VideoPreviewProps = {
  valueVideo: string;
  id: number;
}

function VideoPreview({valueVideo, id}: VideoPreviewProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!isMounted && videoRef.current === null) {
      return;
    }

    const {current} = videoRef;

    current?.addEventListener('loadeddata', () => {
      setTimeout(() => {current?.play();}, 1000);
    });

    return () => {
      isMounted = false;
    };
  },[videoRef]);

  return(
    <video
      src={valueVideo}
      width="280"
      height="175"
      ref={videoRef}
    >
    </video>
  );
}

export default VideoPreview;
