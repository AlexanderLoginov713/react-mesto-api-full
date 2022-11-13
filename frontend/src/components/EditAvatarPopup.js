import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isLoading, isOpen, onClose, onUpdateAvatar }) {
  const linkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }

  useEffect(function () {
    linkRef.current.value = '';
  }, [isOpen, linkRef]);

  return (
    <PopupWithForm
      name="popup popup_avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          id="avatarLink"
          className="popup__input popup__input_avatar"
          placeholder="Ссылка на картинку"
          name="avatar"
          required
          ref={linkRef}
        />
        <span id="avatarLink-error" className="error"></span>
      </label>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;