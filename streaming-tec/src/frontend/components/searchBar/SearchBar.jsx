import React from 'react';
import ItemList from '../itemList/ItemList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';

export default function SearchBar({ placeholder, section }) {

    const [searchText, setSearchText] = React.useState("");
    const [items, setItems] = React.useState([]);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
        console.log("Escribiendo")
    }
    

    const handleSearchClick = () => {
        const ip = "http://44.214.42.196"
        let port;
        if (section === "series") {
            port = 5001;
        } else if (section === "audios") {
            port = 5002;
        } else {
            port = 5000;
        }

        fetch(`${ip}:${port}/search/${searchText}`)
            .then(response => response.json())
            .then(data => {
                setItems(data);
            })
            .catch(error => {
                console.error("Error al buscar videos: ", error);
            });
        console.log(items)
    };

    return (
        <div className="search-bar-container">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    value={searchText}
                    onChange={handleInputChange}
                />
                <button className="btn btn-primary" onClick={handleSearchClick}>
                    Buscar
                </button>
            </div>
            <ItemList items={items} />
        </div>
    );
}