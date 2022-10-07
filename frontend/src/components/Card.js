import React from 'react';
import TrashImg from '../images/trash.svg';
import { UserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(UserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`
    );

    const cardDeleteButtonClassName = (
        `element__delete-btn ${isOwn ? 'element__delete-btn_visible' : 'element__delete-btn_hidden'}`
    );

    function handleClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    };

    return (
        <article className="element">
            <button aria-label="Удалить" className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}>
                <img
                    src={TrashImg}
                    alt="удалить"
                    className="element__trash"
                />
            </button>
            <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button
                        aria-label="Оценить"
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    />
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
};

export default Card;