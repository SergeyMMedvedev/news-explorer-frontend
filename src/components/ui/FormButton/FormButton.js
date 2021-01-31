import React from 'react';
import './FormButton.css';

function FormButton({ className, value, disabled }) {
  return (
    <input type="submit" className={`form-button ${disabled && 'form-button_disabled'} ${className || ''}`} value={value} disabled={disabled} />
  );
}

export default FormButton;
