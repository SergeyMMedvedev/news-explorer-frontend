export function clearNewscardsFromLocalStorage() {
  localStorage.removeItem('newscards');
  localStorage.removeItem('minShowCardIndex');
  localStorage.removeItem('maxShowCardIndex');
}

export function clearUserFromLocalStorage() {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('email');
  localStorage.removeItem('jwt');
}
