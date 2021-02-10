class NewsApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getNews({
    q,
    from,
    to,
    sortBy,
    pageSize,
    language,
  }) {
    const loadingNews = fetch((
      `${this.baseUrl}`
      + `&q=${q || 'Apple'}`
      + `&from=${from || ''}`
      + `&to=${to || ''}`
      + `&sortBy=${sortBy || 'popularity'}`
      + `&pageSize=${pageSize || '100'}`
      + `&language=${language || 'ru'}`
    ), {
      headers: this.headers,
    });
    console.log((
      `${this.baseUrl}`
      + `&q=${q || 'Apple'}`
      + `&from=${from || new Date()}`
      + `&sortBy=${sortBy || 'popularity'}`
      + `&pageSize=${pageSize || '100'}`
      + `&language=${language || 'ru'}`
    ));
    const response = await loadingNews;
    if (!response.ok) { return Promise.reject(`Ошибка: ${response.status}`); }
    const news = await response.json();
    return new Promise((resolve) => {
      resolve(news);
    });
  }
}

// const BASE_URL = 'https://nomoreparties.co/news/v2/everything?q=Apple&from=2021-02-09&sortBy=popularity&apiKey=95d1849e97f6486684013297e3a097ab';
const BASE_URL = 'https://nomoreparties.co/news/v2/everything?apiKey=95d1849e97f6486684013297e3a097ab';
const newsApi = new NewsApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default newsApi;
