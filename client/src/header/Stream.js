import React from 'react';
import ReactPlayer from 'react-player';
import { useAlert } from 'react-alert';

export default function Stream({ source, playing, volume, videoPlayer }) {
  const alert = useAlert();

  return (
    <section className="embeded-video">
      <ReactPlayer
        className="ReactPlayer"
        url={source}
        playing={playing}
        volume={parseFloat(volume)}
        muted={false}
        ref={videoPlayer}
        width="100%"
        height="100%"
        onError={(err) => {
          alert.error(
            'Player could not load. Try reloading the page, or contact the admin.',
          );
        }}
      />
    </section>
  );
}
