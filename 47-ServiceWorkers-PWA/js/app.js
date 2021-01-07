if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceWorker.js')
    .then(result => console.log('Service Worker registered', result))
    .catch(error => console.log('Something wrong happended', error));
} else {
  console.log('Service Workers are not supported');
}
