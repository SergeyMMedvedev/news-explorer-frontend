import React from 'react';
import './PopupForm.css';

function PopupForm({ children, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="popup__form">
      {children}
      <input type="submit" className="popup__submit form-button" />
    </form>
  );
}

export default PopupForm;
