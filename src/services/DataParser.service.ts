import { NextFunction, Request, Response } from 'express';

class DataParserService {
  constructor() {}

  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, minCount, maxCount } = req.body;

      res.status(200).json({ startDate, endDate, minCount, maxCount });
    } catch (e) {
      next(e);
    }
  }
}

export default DataParserService;
