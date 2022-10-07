import React from 'react';

import PopupWithForm from "./PopupWithForm";
import { UserContext } from '../contexts/CurrentUserContext';

function PopupEditProfile({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(UserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="editProfile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_name"
                id="name-input"
                name="name"
                type="text"
                placeholder="Имя"
                minLength={2}
                maxLength={40}
                required=""
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="popup__input-error name-input-error" />
            <input
                className="popup__input popup__input_type_job"
                id="job-input"
                name="about"
                type="text"
                placeholder="О себе"
                minLength={2}
                maxLength={200}
                required=""
                value={description || ""}
                onChange={handleChangeDescription}
            />
            <span className="popup__input-error job-input-error" />
        </PopupWithForm>
    );
};

export default PopupEditProfile;