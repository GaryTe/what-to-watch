import {useEffect, useRef} from 'react';

type VideoPreviewProps = {
  valueVideo: string;
}

function VideoPreview({valueVideo}: VideoPreviewProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!isMounted && videoRef.current === null) {
      return;
    }

    //videoRef.current?.addEventListener('loadedmetadata', () => {
    videoRef.current?.play();
    //});

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
