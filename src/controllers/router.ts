import { Application, Router } from 'express';
import RecordRepository from '../repositories/Record.repository';
import RecordService from '../services/Record.service';
import IndexRoute from './index.route';

const recordService = new RecordService(new RecordRepository());

const _routes: [string, Router][] = [
  ['/', new IndexRoute(recordService).routes()],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
