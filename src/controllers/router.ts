import { Application, Router } from 'express';
import DataParserService from '../services/DataParser.service';
import IndexRoute from './index.route';

const dataParserService = new DataParserService();

const _routes: [string, Router][] = [
  ['/', new IndexRoute(dataParserService).routes()],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
