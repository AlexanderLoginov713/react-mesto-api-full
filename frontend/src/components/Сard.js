import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const { name, link, likes, owner } = cardData;

  const isOwn = owner._id === currentUser._id
  const cardDeleteButtonClassName = (
    `element__trash-btn ${isOwn ? '' : 'element__trash-btn_hidden'}`
  )
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`);

  return (

    <article className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={() => onCardDelete(cardData)}></button>
      <img src={link} alt={name} className="element__image" onClick={() => onCardClick(cardData)} />
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={() => onCardLike(cardData)}></button>
          <span className="element__like-count">{likes.length}</span>
        </div>
      </div>
    </article>

  );
}
export default Card;