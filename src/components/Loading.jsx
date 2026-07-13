function Loading({ mensaje = "Cargando talleres..." }) {
  return <p className="loading-message">{mensaje}</p>;
}

const Loading = ({ mensaje = "Cargando experiencias artesanales..." }) => {
  return (
    <div className="loading-container" role="status">
      <div className="loading-spinner"></div>
      <p className="loading-text">{mensaje}</p>
    </div>
  );
};

export default Loading;
