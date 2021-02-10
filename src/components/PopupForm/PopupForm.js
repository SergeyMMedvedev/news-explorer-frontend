import React, { useState } from 'react';
import './PopupForm.css';
import FormButton from '../ui/FormButton/FormButton';

function PopupForm({
  children,
  onSubmit,
  submitButtonDisabled,
  submitText,
  title,
}) {
  const [serverError, setServerError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setServerError(true);
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form">
      {children}
      <span id={`server-error_${title}`} className={`popup__server-error ${serverError && 'popup__server-error_active'}`}>Такой пользователь уже есть</span>
      <FormButton
        className="popup__submit"
        value={submitText}
        disabled={submitButtonDisabled}
      />
    </form>
  );
}

export default PopupForm;
