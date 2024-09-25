import React from "react";
import "./ItemList.css";
import Item from "../item/Item";

function ItemList({ items, type }) {
    if (items.length === 0) {
        return null //No renderizar nada
    }

    return (
        <div className="item-list">
            {items.length > 0 ? (
                items.map((item, index) => (
                    <Item key={index} item={item} type={type} />
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default ItemList;