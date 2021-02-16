import React from 'react';
import './PopupForm.css';
import FormButton from '../ui/FormButton/FormButton';
import '../appearAnimation/appearAnimation.css';

function PopupForm({
  children,
  onSubmit,
  submitButtonDisabled,
  submitText,
  title,
  serverError,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form">
      {children}
      <span id={`server-error_${title}`} className={`popup__server-error ${serverError && 'popup__server-error_active appearAnimation'}`}>{serverError}</span>
      <FormButton
        className="popup__submit"
        value={submitText}
        disabled={submitButtonDisabled}
      />
    </form>
  );
}

export default PopupForm;
