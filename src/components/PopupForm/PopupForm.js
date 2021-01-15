import './PopupForm.css';

function PopupForm({ children }) {
  return (
    <form className='popup__form'>
      {children}
      <input type='submit' className='popup__submit form-button' />
    </form>
  )
}

export default PopupForm;
