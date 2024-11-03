import React, { useState, useEffect } from 'react';

function TableauDeBord() {
  const [dateActuelle, setDateActuelle] = useState(new Date());
  const [citation, setCitation] = useState('');
  const [blague, setBlague] = useState('');
  const [evenement, setEvenement] = useState('');
  const [mocktail, setMocktail] = useState('');
  const [recette, setRecette] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState('');
  const [erreurCitation, setErreurCitation] = useState(null);
  const [erreurBlague, setErreurBlague] = useState(null);
  const [erreurEvenement, setErreurEvenement] = useState(null);
  const [erreurMocktail, setErreurMocktail] = useState(null);
  const [erreurRecette, setErreurRecette] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setDateActuelle(new Date()), 60000);

    const fetchCitation = async () => {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) throw new Error('Erreur lors de la récupération de la citation.');
        const data = await response.json();
        setCitation(data.slip.advice);
      } catch (error) {
        setErreurCitation(error.message);
      }
    };

    const fetchBlague = async () => {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) throw new Error('Erreur lors de la récupération de la blague.');
        const data = await response.json();
        setBlague(`${data.setup} - ${data.punchline}`);
      } catch (error) {
        setErreurBlague(error.message);
      }
    };

    const fetchEvenement = async () => {
      try {
        const response = await fetch(`https://history.muffinlabs.com/date/${dateActuelle.getMonth() + 1}/${dateActuelle.getDate()}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération de l’événement historique.');
        const data = await response.json();
        setEvenement(data.data.Events[0].text);
      } catch (error) {
        setErreurEvenement(error.message);
      }
    };

    const fetchMocktail = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
        if (!response.ok) throw new Error('Erreur lors de la récupération du mocktail.');
        const data = await response.json();
        const randomMocktail = data.drinks[Math.floor(Math.random() * data.drinks.length)];
        setMocktail(randomMocktail.strDrink);
      } catch (error) {
        setErreurMocktail(error.message);
      }
    };

    const fetchRecette = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!response.ok) throw new Error('Erreur lors de la récupération de la recette.');
        const data = await response.json();
        setRecette(data.meals[0].strMeal);
        setIngredients(Object.entries(data.meals[0])
          .filter(([key, value]) => key.startsWith("strIngredient") && value)
          .map(([key, value]) => value));
        setInstructions(data.meals[0].strInstructions);
      } catch (error) {
        setErreurRecette(error.message);
      }
    };

    fetchCitation();
    fetchBlague();
    fetchEvenement();
    fetchMocktail();
    fetchRecette();

    return () => clearInterval(timer);
  }, [dateActuelle]);

  const openDialog = () => document.getElementById('dialogRecette').showModal();
  const closeDialog = () => document.getElementById('dialogRecette').close();

  return (
    <div>
      <h1>Tableau de bord "old-school"</h1>
      <p>Date : {dateActuelle.toLocaleDateString()}</p>
      <p>Heure : {dateActuelle.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

      <div>
        <h3>Citation du jour :</h3>
        <p>{erreurCitation || citation || 'Chargement de la citation...'}</p>
      </div>

      <div>
        <h3>Blague du jour :</h3>
        <p>{erreurBlague || blague || 'Chargement de la blague...'}</p>
      </div>

      <div>
        <h3>Événement historique :</h3>
        <p>{erreurEvenement || evenement || 'Chargement de l’événement...'}</p>
      </div>

      <div>
        <h3>Mocktail du jour :</h3>
        <p>{erreurMocktail || mocktail || 'Chargement du mocktail...'}</p>
      </div>

      <div>
        <h3>Recette du jour :</h3>
        <p>
          {erreurRecette || recette || 'Chargement de la recette...'}{' '}
          <button onClick={openDialog} disabled={!recette}>Voir la recette complète</button>
        </p>
      </div>

      <dialog id="dialogRecette">
        <h2>{recette}</h2>
        <h3>Ingrédients :</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions :</h3>
        <p>{instructions}</p>
        <button onClick={closeDialog}>Fermer</button>
      </dialog>
    </div>
  );
}

export default TableauDeBord;
