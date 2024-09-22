import { FaVideo, FaMusic, FaHeart } from 'react-icons/fa';
import imgPrueba from '../../images/imgPrueba.jpg';
import './Card.css';
import { useNavigate } from 'react-router-dom';
const {SaveFavorite} = require('../../../backend/fireBase/SaveGetFavorite');

export default function Card({ type, title, urlVideo }) {
  const icon = type === 'video' ? <FaVideo /> : <FaMusic />;
  const navigate = useNavigate();

  const handleClick = () => {
    const encodedUrl = encodeURIComponent(urlVideo);
    navigate(`/video/${encodedUrl}`);
    console.log(urlVideo)
  }

  const handleClickFavorite = async (event) => {
    // Evitar que se active el click en la tarjeta
    event.stopPropagation();
    try {
      await SaveFavorite(title, urlVideo);
    } catch (error) {
      alert('Error al guardar en favoritos');
    }
  }

  return (
    <div className="card mb-3" onClick={handleClick} style={{ maxWidth: '400px' }}>
      <img src={imgPrueba} className="card-img-top" alt={title} />
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="me-3">{icon}</span>
          <span>{title}</span>
        </div>
        <FaHeart className="text-danger" onClick={handleClickFavorite} style={{ cursor: 'pointer' }}/>
      </div>
    </div>
  );
}