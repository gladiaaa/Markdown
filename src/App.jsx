import React from 'react';
import './App.css';
import EditeurMarkdown from './components/EditeurMarkdown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Éditeur Markdown</h1>
      </header>
      <EditeurMarkdown />
    </div>
  );
}

export default App;
