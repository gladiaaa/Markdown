import React, { useState } from 'react';

function EditeurMarkdown() {
  const [titreFichier, setTitreFichier] = useState('mon_fichier');
  const [markdown, setMarkdown] = useState('');

  // Fonction pour convertir le texte Markdown en HTML
  const convertirMarkdownEnHTML = (markdownText) => {
    let htmlText = markdownText;
    
    // Titres Markdown
    htmlText = htmlText.replace(/^###### (.*$)/gm, '<h6>$1</h6>');
    htmlText = htmlText.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
    htmlText = htmlText.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    htmlText = htmlText.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    htmlText = htmlText.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    htmlText = htmlText.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Texte en gras et italique
    htmlText = htmlText.replace(/\*\*\*(.*?)\*\*\*/gm, '<strong><em>$1</em></strong>');
    htmlText = htmlText.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');
    htmlText = htmlText.replace(/\*(.*?)\*/gm, '<em>$1</em>');

    // Bloc de code et code en ligne
    htmlText = htmlText.replace(/```([^`]+)```/gm, '<pre><code>$1</code></pre>');
    htmlText = htmlText.replace(/`([^`]+)`/gm, '<code>$1</code>');

    // Listes à puces et listes numérotées
    htmlText = htmlText.replace(/^\* (.*)/gm, '<ul><li>$1</li></ul>');
    htmlText = htmlText.replace(/^\d+\. (.*)/gm, '<ol><li>$1</li></ol>');

    // Listes de tâches
    htmlText = htmlText.replace(/- \[ \] (.*)/gm, '<ul><li><input type="checkbox" disabled> $1</li></ul>');
    htmlText = htmlText.replace(/- \[x\] (.*)/gm, '<ul><li><input type="checkbox" checked disabled> $1</li></ul>');

    // Citations
    htmlText = htmlText.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

    // Liens et images
    htmlText = htmlText.replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" target="_blank">$1</a>');


    // Sauts de ligne
    htmlText = htmlText.replace(/\n/gm, '<br>');

    return htmlText;
  };

  // Gestion des modifications du texte et du titre
  const handleMarkdownChange = (event) => setMarkdown(event.target.value);
  const handleTitleChange = (event) => setTitreFichier(event.target.value);

  // Fonction pour exporter le fichier 
  const exporterMarkdown = () => {
    const element = document.createElement('a');
    const fichier = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(fichier);
    element.download = `${titreFichier || 'mon_fichier'}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Fonction pour importer un fichier .md
  const importerMarkdown = (event) => {
    const fichier = event.target.files[0];
    if (fichier) {
      const lecteur = new FileReader();
      lecteur.onload = (e) => setMarkdown(e.target.result);
      lecteur.readAsText(fichier);
    }
  };

  return (
    <div className="editeur-markdown">
      <h1>Éditeur Markdown</h1>
      
      <input
        type="text"
        value={titreFichier}
        onChange={handleTitleChange}
        placeholder="Titre du fichier"
        className="titre-input"
      />

      <textarea
        className="markdown-input"
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Écrivez votre contenu en Markdown ici..."
        rows="10"
        cols="50"
      />

      <div className="buttons">
        <button className="export-button" onClick={exporterMarkdown}>Exporter le Markdown</button>
        <input type="file" onChange={importerMarkdown} className="import-button" />
      </div>

      <h2>Prévisualisation</h2>
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: convertirMarkdownEnHTML(markdown) }}
      />
    </div>
  );
}

export default EditeurMarkdown;
