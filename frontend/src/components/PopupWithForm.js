import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id={`popup_${props.name}`}>
      <div className="popup__container">
        <button
          aria-label="Закрыть окно"
          className="popup__close-btn"
          type="button"
          onClick={props.onClose}
        />
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className="popup__save-btn"
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;