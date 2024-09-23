import React from 'react';
import "./Audio.css";
import "@madzadev/audio-player/dist/index.css";
import { useParams } from 'react-router-dom';
import Player from "@madzadev/audio-player";


export default function Audio() {
    const url = useParams().url;
    const title = useParams().title;
    const decodedUrl = decodeURIComponent(url);
    const trackList = [{ url: decodedUrl, title: title, tags: [""] },];

    return (
        <div className='container'>
            <h1>Reproductor de Audio</h1>
            <Player
                trackList={trackList}
                includeTags={false}
                includeSearch={false}
                showPlaylist={false}
                sortTracks={true}
                autoPlayNextTrack={true}
            />
        </div>
    );
}