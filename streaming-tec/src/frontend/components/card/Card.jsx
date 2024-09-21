import React from 'react';
import { FaVideo, FaMusic, FaHeart } from 'react-icons/fa';
import imgPrueba from '../../images/imgPrueba.jpg';
import './Card.css';

export default function Card({ type, title }) {
  const icon = type === 'video' ? <FaVideo /> : <FaMusic />;

  return (
    <div className="card mb-3" style={{ maxWidth: '400px' }}>
      <img src={imgPrueba} className="card-img-top" alt={title} />
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="me-3">{icon}</span>
          <span>{title}</span>
        </div>
        <FaHeart className="text-danger" />
      </div>
    </div>
  );
}