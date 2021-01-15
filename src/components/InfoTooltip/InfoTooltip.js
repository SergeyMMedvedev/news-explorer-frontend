import './InfoTooltip.css';
import Popup from '../Popup/Popup';

function InfoTooltip({ isOpen, onClose, onSwitchPopupClick }) {
  return (
    <Popup
      isOpen={isOpen}
      title='Пользователь успешно зарегистрирован!'
      popupSwitcher='Войти'
      onClose={onClose}
      onSwitchPopupClick={onSwitchPopupClick}
    />
  )
}

export default InfoTooltip;
