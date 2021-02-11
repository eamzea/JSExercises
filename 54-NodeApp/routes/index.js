import router from 'express';

const Router = router();

Router.get('/', (req, res) => {
  res.render('index', {
    pagina: 'Inicio',
  });
});

Router.get('/nosotros', (req, res) => {
  res.render('nosotros', {
    pagina: 'Nosotros',
  });
});

Router.get('/viajes', (req, res) => {
  res.render('viajes', {
    pagina: 'Viajes',
  });
});

Router.get('/testimoniales', (req, res) => {
  res.render('testimoniales', {
    pagina: 'Testimoniales',
  });
});

export default Router;
