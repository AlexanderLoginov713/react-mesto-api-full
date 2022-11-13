import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isLoading, isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"

      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_profile"
          id="name-card"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleNameChange}
        />
        <span id="name-card-error" className="error"></span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_profile"
          id="job-card"
          name="job"
          placeholder="О себе"
          minLength="2"
          maxLength="40"
          required
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span id="job-card-error" className="error"></span>
      </label>
    </PopupWithForm>
  )
}
export default EditProfilePopup;