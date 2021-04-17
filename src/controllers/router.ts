import { Application, Router } from 'express';
import IndexRoute from './index.route';

const _routes: [string, Router][] = [['/', new IndexRoute().routes()]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
