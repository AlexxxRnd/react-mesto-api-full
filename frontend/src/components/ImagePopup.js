import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_img-open ${card.link ? "popup_opened" : ""}`} id="popup_img">
            <div className="popup__container-img">
                <button
                    aria-label="Закрыть окно"
                    className="popup__close-btn"
                    type="button"
                    onClick={onClose}
                />
                <img className="popup__image" src={card.link} alt={card.name} />
                <h2 className="popup__title-img">{card.name}</h2>
            </div>
        </div>
    );
};

export default ImagePopup;