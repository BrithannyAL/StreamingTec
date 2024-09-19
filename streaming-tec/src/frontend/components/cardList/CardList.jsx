import React from 'react';
import Card from '../card/Card';

export default function CardList({ items }) {
    return (
        <div className="container">
            {items.map((item, index) => (
                <Card key={index} type={item.type} title={item.title} />
            ))}
        </div>
    );
}