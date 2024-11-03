import React, { useState } from 'react';

// Liste d'URL de GIFs de mèmes des années 2000
const memeUrls = [
  'https://media1.tenor.com/m/zBc1XhcbTSoAAAAC/nyan-cat-rainbow.gif',
  'https://media1.tenor.com/m/ONgzI_xtCpgAAAAd/grumpy-cat-smile.gif', 
  'https://i.imgflip.com/91a8cz.jpg',
];

function BoutonMagique() {
  const [memes, setMemes] = useState([]);

  // Fonction pour obtenir un mème aléatoire
  const getRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memeUrls.length);
    return memeUrls[randomIndex];
  };

  // Fonction pour afficher un nouveau mème aléatoire
  const afficherMeme = () => {
    const newMeme = getRandomMeme();
    
    // Empêche l'affichage du même mème consécutivement
    if (memes[memes.length - 1] !== newMeme) {
      setMemes((prevMemes) => [...prevMemes, newMeme]);
    } else {
      afficherMeme(); // Rappelle la fonction pour obtenir un autre mème
    }
  };

  // Fonction pour effacer tous les mèmes
  const effacerMemes = () => {
    setMemes([]);
  };

  return (
    <div className="bouton-magique-container">
      <button onClick={afficherMeme} className="bouton-magique">
        🎉 Bouton Magique 🎉
      </button>
      <button onClick={effacerMemes} className="bouton-effacer">
        ❌ Retirer la magie
      </button>
      <div className="memes-container">
        {memes.map((meme, index) => (
          <img key={index} src={meme} alt="Meme des années 2000" className="meme-gif" />
        ))}
      </div>
    </div>
  );
}

export default BoutonMagique;
