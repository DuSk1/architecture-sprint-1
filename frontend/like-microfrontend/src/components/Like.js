import React from 'react';

function Like({card, onCardLike, currentUser}) {

    function handleLikeClick() {
        onCardLike(card);
    }

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;

    return (
        <div className="card__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="card__like-count">{card.likes.length}</p>
        </div>
    );
}

export default Like;
