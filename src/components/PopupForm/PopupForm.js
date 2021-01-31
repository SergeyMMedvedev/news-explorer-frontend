import React from 'react';
import './PopupForm.css';
import FormButton from '../ui/FormButton/FormButton';

function PopupForm({
  children,
  onSubmit,
  submitButtonDisabled,
  submitText,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form">
      {children}
      <FormButton
        className="popup__submit"
        value={submitText}
        disabled={submitButtonDisabled}
      />
    </form>
  );
}

export default PopupForm;
