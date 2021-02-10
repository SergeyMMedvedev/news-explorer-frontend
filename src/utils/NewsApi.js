import { NEWS_API_BASE_URL } from './constants';

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

const newsApi = new NewsApi({
  baseUrl: NEWS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default newsApi;
