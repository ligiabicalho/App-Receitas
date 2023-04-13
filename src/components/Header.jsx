import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GiKnifeFork } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import ProfilePicture from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title }) {
  const [inputOn, setInputOn] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    history.push('/app-receitas/profile');
  };

  const handleBtnClick = () => {
    if (inputOn === true) {
      setInputOn(false);
    } else {
      setInputOn(true);
    }
  };

  return (
    <div className="body">
      <header className="header-div">
        <div id="header-buttons">
          <button className="search-profile" onClick={ handleClick } type="button">
            <img
              src={ ProfilePicture }
              alt="imagem de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          {((title === 'Meals' || title === 'Drinks')
            ? (
              <button className="search-profile" onClick={ handleBtnClick } type="button">
                <img
                  src={ SearchIcon }
                  alt="ícone de pesquisa"
                  data-testid="search-top-btn"
                />
              </button>
            )
            : '')}
          {inputOn === true
            ? (
              <SearchBar />)
            : ''}
        </div>
      </header>
      <h1 className="page-tittle" data-testid="page-title">{title}</h1>
      {history.location.pathname === '/app-receitas/meals'
        && <h2 className="knife"><GiKnifeFork /></h2>}
      {history.location.pathname === '/app-receitas/drinks'
        && <h2 className="knife"><BiDrink /></h2>}
    </div>
  );
}

Header.propTypes = ({
  title: PropTypes.string,
}).isRequired;

export default Header;
