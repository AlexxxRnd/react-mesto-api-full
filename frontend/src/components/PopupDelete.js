import React from 'react';

import PopupWithForm from "./PopupWithForm";

function PopupDelete() {
    return (
        <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    );
};

export default PopupDelete;