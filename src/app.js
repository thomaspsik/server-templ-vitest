import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import debug from 'debug';
import { errorHandler, notFound } from './middleware/errorHandler.js';

import testRoute from './api/routes/testRoutes.js';

dotenv.config();
debug.enable(process.env.DEBUG); // enable DEBUG from .env

const startup = debug('startup');
const dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
if (process.env.MODE !== 'production') {
  (async () => {
    const { default: cors } = await import('cors');
    app.use(cors());
  })();
}

app.use(express.static(path.join(dirname, '/public')));
app.use(express.json());

app.use('/test', testRoute);

app.use(errorHandler);
app.use(notFound);

process.env.MODE = process.env.MODE.trim();

startup(`Mode is set to: ${process.env.MODE}`);

// don´t start server when in test mode
if (['development', 'production'].includes(process.env.MODE)) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => startup(`Server is running on port ${PORT}`));
} else {
  startup('Server not started (test mode).');
}

export default app;
