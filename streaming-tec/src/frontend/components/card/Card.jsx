import React from 'react';
import { FaVideo, FaMusic } from 'react-icons/fa';

export default function Card({ type, title }) {
  const icon = type === 'video' ? <FaVideo /> : <FaMusic />;

  return (
    <div className="card mb-3" style={{ maxWidth: '400px' }}>
      <div className="card-body d-flex align-items-center">
        <span className="me-3">{icon}</span>
        <span>{title}</span>
      </div>
    </div>
  );
}