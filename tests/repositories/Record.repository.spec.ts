import RecordRepository from '../../src/repositories/Record.repository';
import { dbRunner } from '../utils/db.runner';

describe('Record Repository', () => {
  dbRunner();

  let recordRepo: RecordRepository;

  beforeAll(async () => {
    recordRepo = new RecordRepository();
  });

  it('test', async () => {
    const res = await recordRepo.getRecords({
      startDate: new Date('2020-01-01'),
      endDate: new Date('2020-12-25'),
      minCount: 2700,
      maxCount: 2800,
    });

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: expect.any(String),
          createdAt: expect.any(Date),
          totalCount: expect.any(Number),
        }),
      ]),
    );
  });
});
