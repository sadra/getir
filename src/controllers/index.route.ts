import { Request, Response, Router } from 'express';
import { body, ValidationError, validationResult } from 'express-validator';
import RecordService from '../services/Record.service';

export default class IndexRoute {
  router: Router = Router();

  constructor(private recordService: RecordService) {}

  routes(): Router {
    this.router
      .get(`/`, (req: Request, res: Response) => res.send('Hi! I am Getir :)'))
      .post(`/`, this.queryValidations(), (req: Request, res: Response) => {
        const errors = validationResult(req).formatWith(this.errorFormatter);

        if (!errors.isEmpty()) {
          return res.status(400).json({
            code: 400,
            msg: 'Bad Request!',
            error: errors.array(),
          });
        }

        this.recordService.getRecords(req, res);
      });

    return this.router;
  }

  private queryValidations = () => [
    body('startDate')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('must be a date with YYYY-MM-DD fromat'),
    body('endDate')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('must be a date with YYYY-MM-DD fromat'),
    body('minCount').isNumeric().withMessage('must be a valid number'),
    body('maxCount').isNumeric().withMessage('must be a valid number'),
  ];

  private errorFormatter = ({ location, msg, param }: ValidationError) => {
    return `${location}[${param}]: ${msg}`;
  };
}
