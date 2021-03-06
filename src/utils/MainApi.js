import { MAIN_API_BASE_URL } from './constants';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getArticles() {
    const loadingArticles = fetch((`${this.baseUrl}/articles`), {
      headers: this.headers,
    });
    const response = await loadingArticles;
    const articles = await response.json();
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${articles.message}`);
    }
    return new Promise((resolve) => {
      resolve(articles);
    });
  }

  async saveArticle(card) {
    const loadingResponse = fetch((`${this.baseUrl}/articles`), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(card),
    });
    const response = await loadingResponse;
    const responseData = await response.json();
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${responseData.message}`);
    }
    return new Promise((resolve) => {
      resolve(responseData);
    });
  }

  async deleteArticle(id) {
    const loadingResponse = fetch((`${this.baseUrl}/articles/${id}`), {
      method: 'DELETE',
      headers: this.headers,
    });
    const response = await loadingResponse;
    const responseData = await response.json();
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${responseData.message}`);
    }
    return new Promise((resolve) => {
      resolve(responseData);
    });
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default mainApi;
