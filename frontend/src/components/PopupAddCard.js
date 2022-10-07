import React from 'react';

import PopupWithForm from "./PopupWithForm";

function PopupAddCard({ isOpen, onClose, onAddCard }) {
    function handleSubmit(e) {
        e.preventDefault();
        onAddCard({
            name,
            link,
        });
    }
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name="addCard"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_mesto-name"
                id="mesto-input"
                name="name"
                type="text"
                placeholder="Название"
                minLength={2}
                maxLength={30}
                required=""
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="popup__input-error mesto-input-error" />
            <input
                className="popup__input popup__input_type_url"
                id="url-input"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                required=""
                value={link || ""}
                onChange={handleChangeLink}
            />
            <span className="popup__input-error url-input-error" />
        </PopupWithForm>
    );
};

export default PopupAddCard;