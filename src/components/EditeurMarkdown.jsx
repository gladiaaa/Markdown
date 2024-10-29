import React, { useState } from 'react';

function EditeurMarkdown() {
  const [markdown, setMarkdown] = useState('');

  // Fonction de conversion Markdown -> HTML (basique)
  const convertirMarkdownEnHTML = (markdown) => {
    // Convertir les titres
    markdown = markdown.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    markdown = markdown.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    markdown = markdown.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    // Convertir le texte en gras et en italique
    markdown = markdown.replace(/\*\*\*(.*)\*\*\*/gim, '<strong><em>$1</em></strong>');
    markdown = markdown.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*)\*/gim, '<em>$1</em>');

    // Convertir les listes 
    markdown = markdown.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');

    // Convertir les sauts de ligne en paragraphes
    markdown = markdown.replace(/\n\n/gim, '<br/><br/>');
    //blockquote
    markdown = markdown.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    return markdown.trim();
  };

  const gererChangementMarkdown = (event) => setMarkdown(event.target.value);

  const exporterMarkdown = () => {
    const element = document.createElement('a');
    const fichier = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(fichier);
    element.download = 'markdown.md';
    document.body.appendChild(element);
    element.click();
  };

  const importerMarkdown = (event) => {
    const fichier = event.target.files[0];
    if (fichier) {
      const lecteur = new FileReader();
      lecteur.onload = (e) => setMarkdown(e.target.result);
      lecteur.readAsText(fichier);
    }
  };

  return (
    <div>
      <textarea
        className="markdown-input"
        value={markdown}
        onChange={gererChangementMarkdown}
        placeholder="Écrivez votre contenu en Markdown ici..."
        rows="10"
        cols="50"
      />
      <div className="buttons">
        <button className="export-button" onClick={exporterMarkdown}>Exporter le Markdown</button>
        <input className="button" type="file" onChange={importerMarkdown} />
      </div>
      <h2>Prévisualisation</h2>
      <div className="preview" dangerouslySetInnerHTML={{ __html: convertirMarkdownEnHTML(markdown) }} />
    </div>
  );
}

export default EditeurMarkdown;
