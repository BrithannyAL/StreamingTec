import React from 'react';
import ItemList from '../itemList/ItemList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';

export default function SearchBar() {
    const [searchText, setSearchText] = React.useState("");
    const [items, setItems] = React.useState([]);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
        console.log("Escribiendo")
    }

    const handleSearchClick = () => {
        console.log("Buscar")
        fetch(`http://localhost:5000/search/${searchText}`)
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
                    placeholder="Buscar video"
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