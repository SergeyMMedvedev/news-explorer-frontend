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
  serverResponseError,
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
        {popupWithForm && (
          <PopupForm
            onSubmit={onSubmit}
            submitButtonDisabled={submitButtonDisabled}
            submitText={submitText}
            title={title}
            serverResponseError={serverResponseError}
          >
            {children}
          </PopupForm>
        )}
        <button type="button" onClick={onClose} className="popup__close" />
        {popupWithForm
          ? (
            <p className="popup__switch-container_with-form">
              или
              <span onClick={handleSwitchPopupClick} className="popup__switcher">
                {popupSwitcher}
              </span>
            </p>
          )
          : (
            <p className="popup__switch-container">
              <span onClick={handleSwitchPopupClick} className="popup__switcher">
                {popupSwitcher}
              </span>
            </p>
          )}
      </div>
    </div>
  );
}

export default Popup;
