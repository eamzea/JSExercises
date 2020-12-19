const notificationBtn = document.querySelector('#notificar');

notificationBtn.onclick = () => {
  Notification.requestPermission().then(resultado => console.log(resultado));
};

const seeNotification = document.querySelector('#verNotificacion');
seeNotification.onclick = () => {
  if (Notification.permission === 'granted') {
    const notification = new Notification('Soy una notificación', {
      icon: 'img/ccj.png',
      body: 'Hola!',
    });

    notification.onclick = () => {
      window.open('https://www.google.com.mx');
    };
  }
};

// Internet Connection

const actualizarEstado = () => {
  if (navigator.onLine) {
    console.log('Conectado');
  } else {
    console.log('Desconectado');
  }
};

window.addEventListener('online', actualizarEstado);
window.addEventListener('offline', actualizarEstado);

// FullScreen

const abrir = document.querySelector('#abrir');
const salir = document.querySelector('#salir');

const pantallaCompleta = () => {
  document.documentElement.requestFullscreen();
};
const cerrarPantallaCompleta = () => {
  document.exitFullscreen();
};

abrir.onclick = pantallaCompleta;
salir.onclick = cerrarPantallaCompleta;

// Visibility

document.onvisibilitychange = () => {
  console.log('something changed');
};

document.addEventListener('visibilitychange', () => {
  console.log(document.visibilityState);
  if (document.visibilityState === 'visible') {
    console.log('visible');
  } else {
    console.log('not visible');
  }
});

// Speech recognition

// const micro = document.querySelector('#microfono');
// const salida = document.querySelector('#salida');
// const stop = document.querySelector('#stop');

// const requestPermission = () => {
//   const SpeechRecognition = webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.start();
//   recognition.onstart = () => {
//     salida.classList.add('mostrar');
//     salida.textContent = 'Escuchando... ';
//   };

//   recognition.onspeechend = () => {
//     salida.textContent = 'Terminó';
//     recognition.stop();
//   };

//   recognition.onresult = function (e) {
//     console.log(e);
//     console.log(e.results);
//   };

//   // stop.onclick = stopRecord;
// };

// micro.onclick = requestPermission;
