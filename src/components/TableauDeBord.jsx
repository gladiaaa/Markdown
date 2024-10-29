import React, { useState, useEffect } from 'react';

function TableauDeBord() {
  const [dateActuelle, setDateActuelle] = useState(new Date());
  const [citation, setCitation] = useState('Chargement de la citation...');
  const [blague, setBlague] = useState('Chargement de la blague...');
  const [evenements, setEvenements] = useState('Chargement des événements...');
  const [mocktail, setMocktail] = useState('Chargement du mocktail...');
  const [recette, setRecette] = useState('Chargement de la recette...');
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const minuterie = setInterval(() => {
      setDateActuelle(new Date());
    }, 60000);

    const recupererDonnees = async () => {
      try {
        // Citation du jour
        const reponseCitation = await fetch('https://api.adviceslip.com/advice');
        if (!reponseCitation.ok) throw new Error('Erreur lors de la récupération de la citation.');
        const donneesCitation = await reponseCitation.json();
        setCitation(donneesCitation.slip.advice);

        // Blague du jour
        const reponseBlague = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!reponseBlague.ok) throw new Error('Erreur lors de la récupération de la blague.');
        const donneesBlague = await reponseBlague.json();
        setBlague(`${donneesBlague.setup} - ${donneesBlague.punchline}`);

        // Événements historiques
        const reponseEvenements = await fetch(`http://history.muffinlabs.com/date/${dateActuelle.getMonth() + 1}/${dateActuelle.getDate()}`);
        if (!reponseEvenements.ok) throw new Error('Erreur lors de la récupération des événements.');
        const donneesEvenements = await reponseEvenements.json();
        setEvenements(donneesEvenements.data.Events.slice(0, 3).map(event => event.text).join(', '));

        // Mocktail du jour
        const reponseMocktail = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
        if (!reponseMocktail.ok) throw new Error('Erreur lors de la récupération du mocktail.');
        const donneesMocktail = await reponseMocktail.json();
        const mocktailAleatoire = donneesMocktail.drinks[Math.floor(Math.random() * donneesMocktail.drinks.length)];
        setMocktail(mocktailAleatoire.strDrink);

        // Recette du jour
        const reponseRecette = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!reponseRecette.ok) throw new Error('Erreur lors de la récupération de la recette.');
        const donneesRecette = await reponseRecette.json();
        setRecette(donneesRecette.meals[0].strMeal);

      } catch (erreur) {
        setErreur('Une erreur est survenue lors du chargement des données.');
      }
    };

    recupererDonnees();

    return () => clearInterval(minuterie);
  }, []);

  return (
    <div>
      <h1>Tableau de bord "old-school"</h1>
      <p>Date : {dateActuelle.toLocaleDateString()}</p>
      <p>Heure : {dateActuelle.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      {erreur ? <p>{erreur}</p> : (
        <>
          <p>Citation du jour : {citation}</p>
          <p>Blague du jour : {blague}</p>
          <p>Événements historiques : {evenements}</p>
          <p>Mocktail du jour : {mocktail}</p>
          <p>Recette du jour : {recette}</p>
        </>
      )}
    </div>
  );
}

export default TableauDeBord;
