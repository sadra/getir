import { RecordDto, RecordsQueryDto } from '../dto';

export interface IRecordRepository {
  getRecords(query: RecordsQueryDto): Promise<RecordDto[]>;
}
