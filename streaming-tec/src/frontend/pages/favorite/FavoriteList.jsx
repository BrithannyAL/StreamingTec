import React from 'react';
import CardList from '../../components/cardList/CardList';

export default function FavoriteList() {
    const videoItems = [
        { type: 'video', title: 'Video 1' },
        { type: 'video', title: 'Video 2' },
    ];

    const songItems = [
        { type: 'song', title: 'Song 1' },
        { type: 'song', title: 'Song 2' },
    ];

    return (
        <div style={{width: '100%', height: '100hv'}} className="container">
            <h1>Mis favoritos</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2 style={{color: 'white'}}>Videos</h2>
                    <CardList items={videoItems} />
                </div>
                <div className="col-md-6">
                    <h2 style={{color: 'white'}}>Audios</h2>
                    <CardList items={songItems} />
                </div>
            </div>
        </div>
    );
}