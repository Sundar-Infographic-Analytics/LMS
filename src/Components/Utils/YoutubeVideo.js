import React from 'react';

function YouTubeVideo({ videoUrl }) {
  return (
    <div>
      <iframe
        title='YouTube Video'
        width="560"
        height="315"
        src={videoUrl}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YouTubeVideo;
