import './Footer.css';

const Footer = ({ tableNumber = 5, guests = 2 }) => {
  return (
    <footer className="footer d-flex justify-content-around align-items-center py-2 px-3 border-top">
      <div className="footer-item" title="Visualizza carrello">
        🛒 Cart
      </div>

      {/* 🎨 Tema */}
      <div className="footer-item" title="Cambia tema">
        🎨 Theme
      </div>

      {/* 🪑 Tavolo */}
      <div className="footer-item" title="Tavolo attuale">
        🪑 Table {tableNumber}
      </div>

      {/* 👥 Persone */}
      <div className="footer-item" title="Numero di persone sedute">
        👥 Guest    {guests}
      </div>
    </footer>
  );
};

export default Footer;
