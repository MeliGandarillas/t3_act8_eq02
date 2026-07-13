import React from 'react';
import '../styles/loading.css';

const Loading = ({ mensaje = "Cargando experiencias artesanales..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">{mensaje}</p>
    </div>
  );
};

export default Loading;