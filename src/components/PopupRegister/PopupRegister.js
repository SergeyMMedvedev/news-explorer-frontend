import './PopupRegister.css';
import Popup from '../Popup/Popup';

function PopupRegister({ isOpen, onClose, onSwitchPopupClick }) {

  return (
    <Popup
      popupWithForm
      children
      isOpen={isOpen}
      title='Регистрация'
      popupSwitcher='Войти'
      onClose={onClose}
      onSwitchPopupClick={onSwitchPopupClick}
    >
      <label htmlFor='register-email' className='popup__label'>Email</label>
      <input
        id='register-email'
        type='text'
        className='popup__input'
        placeholder='Введите почту'
        name='email'
      />
      <label htmlFor='register-password' className='popup__label'>Пароль</label>
      <input
        id='register-password'
        type='text'
        className='popup__input'
        placeholder='Введите пароль'
        name='password'
      />
      <label htmlFor='register-name' className='popup__label'>Имя</label>
      <input
        id='register-name'
        type='text'
        className='popup__input'
        placeholder='Введите свое имя'
        name='name'
      />
    </Popup>

  )
}

export default PopupRegister;
