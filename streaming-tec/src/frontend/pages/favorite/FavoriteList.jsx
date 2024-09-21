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
        <div className="container d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
            <h1 className="my-4">Mis favoritos</h1>
            <div className="row w-100">
                <div className="col-md-6 d-flex flex-column align-items-center">
                    <h2 style={{ color: 'white' }}>Videos</h2>
                    <CardList items={videoItems} />
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center">
                    <h2 style={{ color: 'white' }}>Audios</h2>
                    <CardList items={songItems} />
                </div>
            </div>
        </div>
    );
}