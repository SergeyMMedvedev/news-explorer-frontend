import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <p className='footer__copyright'>© 2020 Supersite, Powered by News API</p>
      <div className='footer__links'>

        <ul className='footer__navigation'>
          <li className='footer__navigation-item'>
            <a href='/' className='footer__navigation-link'>Главная</a>
          </li>
          <li className='footer__navigation-item'>
            <a href='https://praktikum.yandex.ru/job/?utm_source=yandex&utm_medium=serp&utm_campaign=first' className='footer__navigation-link' target='blank'>Яндекс.Практикум</a>
          </li>
          <li className='footer__navigation-item'>
            <a href='https://github.com/SergeyMMedvedev' className='footer__navigation-link' target='blank'>
              <div className='footer__github'></div>
            </a>
          </li>
          <li className='footer__navigation-item'>
            <a href='https://www.facebook.com/profile.php?id=100004792398978' className='footer__navigation-link' target='blank'>
              <div className='footer__facebook'></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;
