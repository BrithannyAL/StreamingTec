import React from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";

export default function Item({ item }) {
    const navigate = useNavigate();

    const handleClick = () => {
        const encodedUrl = encodeURIComponent(item.url); // Encode URL
        navigate(`/video/${encodedUrl}`); // Redirect to video component
    }

    return (
        <div className="item" onClick={handleClick}>
            <p className="title">{item.title}</p>
        </div>
    );
}