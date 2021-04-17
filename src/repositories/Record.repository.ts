import { RecordDto, RecordsQueryDto } from '../dto';
import { IRecordRepository } from './Record.repository.interface';
require('dotenv').config();

export default class RecordRepository implements IRecordRepository {
  getRecords(query: RecordsQueryDto): Promise<RecordDto[]> {
    throw new Error('Method not implemented.');
  }
}
