import React from "react";
import "./Home.css";
import SearchBar from "../../components/searchBar/SearchBar";
import { useParams } from "react-router-dom";

export default function Home() {

    const { section } = useParams();

    const renderInfo = () => {
        if (section === "series") {
            return <h1>Series</h1>
        } else if (section === "audios") {
            return <h1>Audios</h1>
        } else {
            return <h1>HOME</h1>
        }
    }

    return (
        <>
            <SearchBar section={section} />
            {renderInfo()}
        </>
    )
}