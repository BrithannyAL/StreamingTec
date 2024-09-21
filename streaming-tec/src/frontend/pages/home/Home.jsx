import React from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import Card from "../../components/card/Card";
import "./Home.css";
import { useParams } from "react-router-dom";
import { FaPage4 } from "react-icons/fa";

export default function Home() {
    const [placeholder, setPlaceholder] = React.useState("Buscar videos...");
    const [title, setTitle] = React.useState("Bienvenido a Streaming-TEC");
    const [items, setItems] = React.useState([]);
    const { section } = useParams();

    React.useEffect(() => {
        if (section === "series") {
            setPlaceholder("Buscar series...");
            setTitle("");
            fetchRandomSeriesVideos();
        } else if (section === "audios") {
            setPlaceholder("Buscar audios...");
            setTitle("");
            fetchRandomSongs()
        } else {
            fetchRandomVideos();
        }
    }, [section]);

    const fetchRandomSongs = async () => {
        try {
            const response = await fetch('http://localhost:5002/random-songs');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error al obtener canciones aleatorias: ", error);
        }
    };

    const fetchRandomSeriesVideos = async () => {
        try {
            const response = await fetch('http://localhost:5001/random-songs');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error al obtener canciones aleatorias: ", error);
        }
    };

    const fetchRandomVideos = async () => {
        try {
            const response = await fetch('http://localhost:5000/random-videos');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error al obtener canciones aleatorias: ", error);
        }
    };

    return (
        <div>
            <SearchBar placeholder={placeholder} section={section} />
            <div className="container">
                <h1 className="text-white">{title}</h1>
                <div className="container">
                    <div className="row">
                        {items.map((item, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <Card type={item.type} title={item.title} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}