import React from 'react';
import './PopupForm.css';
import FormButton from '../ui/FormButton/FormButton';
import '../appearAnimation/appearAnimation.css';

function PopupForm({
  children,
  isOpen,
  onSubmit,
  submitButtonDisabled,
  submitText,
  title,
  serverError,
  classNames,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.lastChild.disabled = true;
    const disabled = true;
    onSubmit(!serverError && disabled);
  }

  return (
    <form onSubmit={handleSubmit} className={classNames.PopupForm}>
      {children}
      <span id={`server-error_${title}`} className={`${classNames.popupServerError} ${(serverError && isOpen) && `${classNames.popupServerErrorActive} appearAnimation`}`}>{serverError}</span>
      <FormButton
        className={classNames.popupSubmit}
        value={submitText}
        disabled={submitButtonDisabled}
      />
    </form>
  );
}

export default PopupForm;
