import { IRecordRepository } from '../repositories/Record.repository.interface';
import { Request, Response } from 'express';

class RecordService {
  constructor(private recordRepository: IRecordRepository) {}

  async getRecords(req: Request, res: Response): Promise<any> {
    try {
      const { startDate, endDate, minCount, maxCount } = req.body;

      const records = await this.recordRepository.getRecords({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        minCount,
        maxCount,
      });

      if (records.length == 0) {
        return res.status(404).json({
          code: 404,
          msg: 'There is no record!',
          records: [],
        });
      }

      res.status(200).json({
        code: 0,
        msg: 'Success',
        records,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        msg: 'Oh! There is an problem.',
        error: error.message,
      });
    }
  }
}

export default RecordService;
