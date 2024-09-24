import React from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";

export default function Item({ item, type }) {
    const navigate = useNavigate();

    const handleClick = () => {
        const encodedUrl = encodeURIComponent(item.url); // Encode URL
        navigate(`/${type}/${encodedUrl}`);
    }

    return (
        <div className="item" onClick={handleClick}>
            <p className="title">{item.title}</p>
        </div>
    );
}