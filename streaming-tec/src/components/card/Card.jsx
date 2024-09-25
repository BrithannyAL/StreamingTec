import { FaVideo, FaMusic, FaHeart } from 'react-icons/fa';
import imgPrueba from '../../images/imgPrueba.jpg';
import './Card.css';
import { useNavigate } from 'react-router-dom';
const {SaveFavorite} = require('../../fireBase/SaveGetFavorite'); 
//Ruta correcta por si da error(volver a colocarla): const {SaveFavorite} = require('../../../backend/fireBase/SaveGetFavorite'); 

export default function Card({ type, title, url }) {
  const icon = type === 'video' ? <FaVideo /> : <FaMusic />;
  const navigate = useNavigate();

  const handleClick = () => {
    const encodedUrl = encodeURIComponent(url);
    navigate(`/${type}/${title}/${encodedUrl}`);
  }

  const handleClickFavorite = async (event) => {
    // Evitar que se active el click en la tarjeta
    event.stopPropagation();
    try {
      await SaveFavorite(title, url);
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