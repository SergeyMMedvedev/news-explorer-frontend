import './SearchForm.css';

function SearchForm() {
  return (
    <>
      
      <section className='searchform'>
        <h2 className='searchform__header'>Что творится в мире?</h2>
        <p className='searchform__text'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form className='searchform__form'>
          <input type='text' className='searchform__input' placeholder='Введите тему новости' />
          <input type='submit' className='searchform__submit-button form-button' value='Искать' />
        </form>
      </section>
      {/* <div className='page__backgrount-container'></div> */}
    </>
  )
}

export default SearchForm;
