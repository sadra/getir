import { Request, Response, Router, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import DataParserService from '../services/DataParser.service';

export default class IndexRoute {
  router: Router = Router();

  constructor(private dataParserService: DataParserService) {}

  routes(): Router {
    this.router
      .get(`/`, (req: Request, res: Response) => res.send('Hi! I am Getir :)'))
      .post(
        `/`,
        [
          body('startDate').isDate().notEmpty(),
          body('endDate').isDate().notEmpty(),
          body('minCount').isNumeric().notEmpty(),
          body('maxCount').isNumeric().notEmpty(),
        ],
        (req: Request, res: Response, next: NextFunction) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          this.dataParserService.getData(req, res, next);
        },
      );

    return this.router;
  }
}
