import successIcon from "../images/SuccesIcon.svg"
import failIcon from "../images/FailIcon.svg";

function InfoTooltip({ isOpen, onClose, errorMessage }) {
  return (
    <div className={isOpen ? `popup popup_info-tooltip popup_opened` : `popup popup_info-tooltip`}>
      <div className="popup__container">
        {errorMessage &&
          <div className="popup__reg-result">
            <img
              src={failIcon}
              alt="Изображение что-то пошло не так"
              className="popup__info-icon" />
            <h2 className="popup__reg-message">Что-то пошло не так! Попробуйте ещё раз.</h2>
          </div>
        }
        {!errorMessage &&
          <div className="popup__reg-result">
            <img
              src={successIcon}
              alt="Изображение успешной регистрации"
              className="popup__info-icon" />
            <h2 className="popup__reg-message">Вы успешно зарегистрировались!</h2>
          </div>
        }
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}>
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;