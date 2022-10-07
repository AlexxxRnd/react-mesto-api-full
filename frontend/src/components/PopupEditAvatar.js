import React from 'react';

import PopupWithForm from "./PopupWithForm";

function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar }) {
    const [avatar, setAvatar] = React.useState('');

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar,
        });
    }

    return (
        <PopupWithForm
            name="edit_avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_avatar"
                id="avatar"
                name="avatar"
                type="url"
                placeholder="Ссылка на картинку"
                required=""
                value={avatar || ""}
                onChange={handleChangeAvatar}
            />
            <span className="popup__input-error avatar-error" />
        </PopupWithForm>
    );
};

export default PopupEditAvatar;