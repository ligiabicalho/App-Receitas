import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/Favorites.css';
import { Link } from 'react-router-dom';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const [favorited, setFavorited] = useState([]);
  const [copied, setCopied] = useState('');
  useEffect(() => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavorites !== null) {
      setFavorited(localFavorites);
    }
  }, []);

  const filterMeal = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const mealFiltered = localFavorites.filter((e) => e.type === 'meal');
    setFavorited(mealFiltered);
    setFilter('meal');
  };

  const filterDrinks = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const drinkFiltered = localFavorites.filter((e) => e.type === 'drink');
    setFavorited(drinkFiltered);
    setFilter('drink');
  };

  const allRecipes = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorited(localFavorites);
    setFilter('all');
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ allRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeal }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
      {favorited.map((e, index) => (
        <div key={ e.id } className="favorite-line">
          <Link
            to={ e.type === 'meal' ? `/meals/${e.id}`
              : `/drinks/${e.id}` }
          >
            <img
              src={ e.image }
              alt="Imagem da receita"
              className="favorite-images"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p
            className="text"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {e.type === 'meal' ? e.nationality : e.alcoholicOrNot }
            {' '}
            -
            {' '}
            { e.category }
          </p>
          <Link
            to={ e.type === 'meal' ? `/meals/${e.id}`
              : `/drinks/${e.id}` }
          >
            <p
              className="text"
              data-testid={ `${index}-horizontal-name` }
            >
              { e.name }
            </p>
          </Link>
          <button type="button" className="icons">
            <img
              src={ blackHeart }
              alt="Desfavoritar"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          <button
            type="button"
            className="icons"
            onClick={ () => {
              copy(e.type === 'meal' ? `${window.location.origin}/meals/${e.id}`
                : `${window.location.origin}/drinks/${e.id}`);
              setCopied(e.id);
            } }
          >
            {e.id === copied ? 'Link copied!'
              : (
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                />)}
          </button>
        </div>))}
    </div>
  );
}

export default FavoriteRecipes;
