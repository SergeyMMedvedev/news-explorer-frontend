import './About.css';
import myImage from '../../images/DSC_2.jpg';


function About() {

  return (
    <section className='section about'>
      <img className='about__image' src={myImage} alt='Сергей Медведев' />
      <div className='about__info-container'>
        <h2 className='about__title section-title'>Сергей</h2>
        <p className='about__text'>Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.<br/><br/>
Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
      </div>
    </section>
  )
}

export default About;
