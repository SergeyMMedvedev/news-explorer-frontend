import './PopupLogin.css';
import Popup from '../Popup/Popup';

function PopupLogin({ isOpen, onClose, onSwitchPopupClick }) {

  return (
    <Popup
      children
      popupWithForm
      isOpen={isOpen}
      title={'Вход'}
      popupSwitcher='Зарегистрироваться'
      onClose={onClose}
      onSwitchPopupClick={onSwitchPopupClick}
    >
      <label htmlFor='login-email' className='popup__label'>Email</label>
      <input
        id='login-email'
        type='text'
        className='popup__input'
        placeholder='Введите почту'
        name='email'
      />
      <label htmlFor='login-password' className='popup__label'>Пароль</label>
      <input
        id='login-password'
        type='text'
        className='popup__input'
        placeholder='Введите пароль'
        name='password'

      />
    </Popup>

  )
}

export default PopupLogin;
