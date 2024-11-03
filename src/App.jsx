import React from 'react';
import TableauDeBord from './components/TableauDeBord';
import EditeurMarkdown from './components/EditeurMarkdown';
import BoutonMagique from './components/boutonMagique/BoutonMagique';
import Clippy from './components/clippy/Clippy';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Tableau de bord et Éditeur Markdown</h1>
      </header>
      <div className="contenu">
        <div className="TableauDeBord">
          <TableauDeBord />
        </div>
        <div className="EditeurMarkdown">
          <EditeurMarkdown />
        </div>
      </div>
      <div className="magic-button">
        <BoutonMagique />
      </div>
      <Clippy />
    </div>
  );
}

export default App;
