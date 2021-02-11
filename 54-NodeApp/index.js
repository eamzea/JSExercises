import express from 'express';
import Router from './routes/index.js';

const app = express();

const port = process.env.PORT || 4000;

app.set('view engine', 'pug');
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.siteName = 'Agencia de Viajes';
  next();
});
app.use(express.static('public'));
app.use('/', Router);

app.listen(port, () => {
  console.log(`Server ready in port ${port}`);
});
