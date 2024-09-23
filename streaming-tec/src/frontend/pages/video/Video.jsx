import React from "react"
import "./Video.css"
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

function Video() {
  const url = useParams().url;
  const title = useParams().title;
  const decodedUrl = decodeURIComponent(url);

  return (
    <div className="container">
      <h1>Reproductor de Video</h1>
      <h2>{title}</h2>
      {url && (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={decodedUrl}
            controls
            loop
            height="100%"
            width="auto"
          />
        </div>
      )}
    </div>
  );
}

export default Video