import React from 'react';
import loadingImg from '../images/loading.svg';
import Card from './Card';

import { UserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const user = React.useContext(UserContext);

    return (
        <main className="content">
            <section className="profile">
                <img
                    className="profile__avatar"
                    src={user.avatar ? user.avatar : loadingImg}
                    alt="аватар"
                />
                <button className="profile__avatar-edit-btn" onClick={onEditAvatar} />
                <div className="profile__info">
                    <h1 className="profile__name">{user.name ? user.name : "загрузка..."}</h1>
                    <button
                        aria-label="Редактировать информацию"
                        className="profile__edit-btn"
                        type="button"
                        onClick={onEditProfile}
                    />
                    <h2 className="profile__subname">{user.about ? user.about : "загрузка..."}</h2>
                </div>
                <button
                    aria-label="Добавить место"
                    className="profile__add-btn"
                    type="button"
                    onClick={onAddPlace}
                />
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (
                        <Card
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            key={card._id}
                        />
                    );
                })}
            </section>
        </main>
    );
}

export default Main;