import { RecordDto, RecordsQueryDto } from '../dto';
import Record from './Record.model';
import { IRecordRepository } from './Record.repository.interface';
require('dotenv').config();

export default class RecordRepository implements IRecordRepository {
  async getRecords(query: RecordsQueryDto): Promise<RecordDto[]> {
    let dataObj: RecordDto[] = await Record.aggregate([
      {
        $match: {
          createdAt: {
            $gte: query.startDate,
            $lt: query.endDate,
          },
        },
      },
      {
        $addFields: {
          totalCount: {
            $reduce: {
              input: '$counts',
              initialValue: 0,
              in: { $add: ['$$value', '$$this'] },
            },
          },
        },
      },
      {
        $match: {
          totalCount: {
            $gte: query.minCount,
            $lt: query.maxCount,
          },
        },
      },
    ]).project({ key: 1, createdAt: 1, totalCount: 1, _id: 0 });

    return dataObj;
  }
}
