import React, { useState } from 'react';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'markdown.md';
    document.body.appendChild(element);
    element.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Markdown Editor</h1>
      </header>
      <textarea
        className="markdown-input"
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Enter your markdown here..."
      />
      <div className="buttons">
        <button className="export-button" onClick={handleExport}>Export Markdown</button>
        <input className="button" type="file" onChange={handleImport} />
      </div>
      <div className="preview">{markdown}</div>
    </div>
  );
}

export default App;
