import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

const CreateProject = () => {
  const [playVideo, setPlayVideo] = useState(false);

  const clickVideo = () => {
    setPlayVideo(true);
  };

  return (
    <>      
      <button onClick={clickVideo}>Click</button>
      {playVideo && (
        <ReactPlayer
          url='https://youtu.be/-ERWlp828kY?feature=shared'
          playing={true}
          controls={true}
        //   width='100%'
        //   height='100%'
        />
      )}
    </>
  );
};

export default CreateProject;
