import React from 'react';
import Like from 'like-microfrontend/Like';
import { CurrentUserContext } from '../contexts/CurrentUserContext'; // @TODO how to share this context?

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  return (
    <li className="places__item card">
      <div className="card__image" style={cardStyle} onClick={handleClick}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>
        <Like
            card={card}
            onCardLike={onCardLike}
            currentUser={currentUser}
        />
      </div>
    </li>
  );
}

export default Card;
