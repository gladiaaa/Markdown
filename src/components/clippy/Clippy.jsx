import React from 'react';
import './Clippy.css';

function Clippy() {
  return (
    <div className="clippy-container">
      <img src="https://media.tenor.com/jtS4RMiJDXUAAAAi/clippy-windows-xp.gif" alt="Clippy" className="clippy-image" />
      <div className="clippy-text">
        Bonjour, je suis Clippy ! Besoin d'aide ?
      </div>
    </div>
  );
}

export default Clippy;
