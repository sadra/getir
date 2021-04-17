import { NextFunction, Request, Response, Router } from 'express';

export default class IndexRoute {
  router: Router = Router();

  constructor() {}

  routes(): Router {
    this.router.get(`/`, (req: Request, res: Response, next: NextFunction) =>
      res.send('Hi! I am Getir :)'),
    );

    return this.router;
  }
}
