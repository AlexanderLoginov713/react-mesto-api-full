import React from 'react';
function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}>
        </button>
        <section className="popup__content">
          <h3 className="popup__title">{title}</h3>
          <form
            name={name}
            className={`popup__form popup__form_${name}`}
            onSubmit={onSubmit}
          >
            {children}
            <button
              type="submit"
              className="popup__submit-button">
              {buttonText}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
export default PopupWithForm;