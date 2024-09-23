import React , { useEffect, useState } from 'react';
import CardList from '../../components/cardList/CardList';
const {getFavorite} = require  ("../../../backend/fireBase/SaveGetFavorite")
//Ruta correcta por si da error(volver a colocarla): const {getFavorite} = require  ("../../../backend/fireBase/SaveGetFavorite")
export default function FavoriteList() {
    const [videoItems, setVideoItems] = useState([]);
    const [songItems, setSongItems] = useState([]);
    const [serieItems, setSerieItems] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favorites = await getFavorite();
                const videos = [];
                const audios = [];
                const series = [];

                // Divide los favoritos según la sección
                favorites.forEach(item => {
                    if (item.seccion === 'videos') {
                        videos.push({ type: 'video', title: item.nombreVideo, urlVideo: item.url }); // Asegúrate de pasar el urlVideo
                    } else if (item.seccion === 'audios') {
                        audios.push({ type: 'audio', title: item.nombreVideo, urlVideo: item.url }); // Si corresponde a audios
                    } else if (item.seccion === 'series') {
                        series.push({ type: 'video', title: item.nombreVideo, urlVideo: item.url }); // Para las series
                    }
                });

                // Actualiza el estado con los elementos divididos
                setVideoItems(videos);
                setSongItems(audios);
                setSerieItems(series);
            } catch (error) {
                console.error("Error al obtener favoritos:", error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
            <h1 className="my-4">Mis favoritos</h1>
            <div className="row w-100">
                <div className="col-md-4 d-flex flex-column align-items-center">
                    <h2 style={{ color: 'white' }}>Videos</h2>
                    <CardList items={videoItems} />
                </div>
                <div className="col-md-4 d-flex flex-column align-items-center">
                    <h2 style={{ color: 'white' }}>Audios</h2>
                    <CardList items={songItems} />
                </div>
                <div className="col-md-4 d-flex flex-column align-items-center">
                    <h2 style={{ color: 'white' }}>Series</h2>
                    <CardList items={serieItems} />
                </div>
            </div>
        </div>
    );
}