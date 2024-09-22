import { FaVideo, FaMusic, FaHeart } from 'react-icons/fa';
import imgPrueba from '../../images/imgPrueba.jpg';
import './Card.css';
import { useNavigate } from 'react-router-dom';

export default function Card({ type, title, urlVideo }) {
  const icon = type === 'video' ? <FaVideo /> : <FaMusic />;
  const navigate = useNavigate();

  const handleClick = () => {
    const encodedUrl = encodeURIComponent(urlVideo);
    navigate(`/video/${encodedUrl}`);
  }

  return (
    <div className="card mb-3" onClick={handleClick} style={{ maxWidth: '400px' }}>
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