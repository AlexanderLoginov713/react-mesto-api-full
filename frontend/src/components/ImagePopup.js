function ImagePopup({ card, onClose }) {
  return (
    <div className={card.link ? "popup popup_view-image popup_opened" : "popup popup_view-image"}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close-button popup__close-button_view-image"
          onClick={onClose}>
        </button>
        <img
          src={card.link}
          alt={card.name}
          className="popup__image" />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;