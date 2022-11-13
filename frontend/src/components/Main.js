import { useContext } from 'react';
import Card from '../components/Сard';
import defaultAvatar from '../images/photo-avatar.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="container">
      <section className="profile">
        <img
          src={currentUser.avatar || defaultAvatar}
          alt="Аватар" className="profile__avatar" />
        <div className="profile__avatar-edit-button"
          onClick={onEditAvatar}>
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="submit"
          className="profile__add-button"
          onClick={onAddPlace}>
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (<Card
            cardData={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
          );
        })}
      </section>
    </main>
  );
}
export default Main;