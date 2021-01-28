import React from 'react';
import './PopupForm.css';

function PopupForm({ children, onSubmit, submitButtonDisabled }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form">
      {children}
      <input type="submit" className={`popup__submit form-button ${submitButtonDisabled && 'popup__submit_disabled'}`} disabled={submitButtonDisabled} />
    </form>
  );
}

export default PopupForm;
