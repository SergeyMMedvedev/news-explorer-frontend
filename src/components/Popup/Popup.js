import React from 'react';
import './Popup.css';
import PopupForm from '../PopupForm/PopupForm';

function Popup({
  children,
  isOpen,
  title,
  popupSwitcher,
  onClose,
  onSwitchPopupClick,
  popupWithForm,
  onSubmit,
  submitText,
  submitButtonDisabled,
  serverError,
  isInfoTooltip,
}) {
  function handleSwitchPopupClick() {
    onClose();
    onSwitchPopupClick();
  }

  function overlayClose(evt) {
    if (
      evt.target.classList.contains('popup__close')
      || evt.target.classList.contains('popup_opened')
    ) {
      onClose();
    }
  }

  return (
    <div onMouseDown={overlayClose} className={`popup ${isOpen && 'popup_opened'}`}>
      <div className={`popup__window ${isOpen && 'popup__window_opened'}`}>
        <h3 className="popup__title">{title}</h3>
        {(isInfoTooltip && serverError && isOpen) && <p className="popup__server-error popup__server-error_active">{serverError}</p> }
        {popupWithForm ? (
          <>
            <PopupForm
              isOpen={isOpen}
              onSubmit={onSubmit}
              submitButtonDisabled={submitButtonDisabled}
              submitText={submitText}
              title={title}
              serverError={serverError}
              classNames={{
                popupForm: 'popup__form',
                popupServerError: 'popup__server-error',
                popupServerErrorActive: 'popup__server-error_active',
                popupSubmit: 'popup__submit',
              }}
            >
              {children}
            </PopupForm>
            <p className="popup__switch-container_with-form">
              или
              <span onClick={handleSwitchPopupClick} className="popup__switcher">
                {popupSwitcher}
              </span>
            </p>
          </>
        ) : (
          (!serverError
            && (
            <p className="popup__switch-container">
              <span onClick={handleSwitchPopupClick} className="popup__switcher">
                {popupSwitcher}
              </span>
            </p>
            )
          )
        )}

        <button type="button" onClick={onClose} className="popup__close" />
      </div>
    </div>
  );
}

export default Popup;
