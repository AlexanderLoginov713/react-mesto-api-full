import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isLoading, isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink
    });
  }

  function handleCardNameChange(event) {
    setCardName(event.target.value);
  }

  function handleCardLinkChange(event) {
    setCardLink(event.target.value);
  }

  return (
    <PopupWithForm
      name="popup_add-element"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Создание...' : 'Создать'}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_add-element"
          id="addPlaceName-card"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="30"
          required
          onChange={handleCardNameChange}
          value={cardName}
        />
        <span id="addPlaceName-card-error" className="error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          className="popup__input popup__input_add-element"
          id="addPhotoLink-card"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleCardLinkChange}
          value={cardLink}
        />
        <span id="job-card-error" className="error"></span>
      </label>
    </PopupWithForm>
  )
}
export default AddPlacePopup;