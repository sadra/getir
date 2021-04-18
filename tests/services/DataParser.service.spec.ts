import { IRecordRepository } from './../../src/repositories/Record.repository.interface';
import RecordService from './../../src/services/Record.service';
import { Request, Response } from 'express';

describe('Data Parser Service', () => {
  let recordRepository: IRecordRepository;
  let recordService: RecordService;

  const mockRequest = {} as Request;
  const mockResponse = {} as Response;

  let dummyRecors = [
    {
      key: 'AxqGywiF',
      createdAt: '2016-11-30T14:47:38.027Z',
      totalCount: 2653,
    },
    {
      key: 'WCklMupa',
      createdAt: '2016-11-29T04:39:49.064Z',
      totalCount: 1476,
    },
    {
      key: 'KYKAKxDr',
      createdAt: '2016-11-27T00:30:34.725Z',
      totalCount: 2713,
    },
  ];

  beforeEach(() => {
    recordRepository = {
      getRecords: jest.fn().mockResolvedValue(dummyRecors),
    };

    mockResponse.status = jest.fn().mockReturnThis();
    mockResponse.send = jest.fn();
    mockResponse.json = jest.fn();

    recordService = new RecordService(recordRepository);
  });

  it('should call recordRepository.getRecords with correct query', async () => {
    mockRequest.body = {
      startDate: '2016-11-01',
      endDate: '2016-12-01',
      minCount: 1000,
      maxCount: 3000,
    };

    await recordService.getRecords(mockRequest, mockResponse);

    expect(recordRepository.getRecords).toBeCalledTimes(1);
    expect(recordRepository.getRecords).toBeCalledWith({
      startDate: new Date('2016-11-01'),
      endDate: new Date('2016-12-01'),
      minCount: 1000,
      maxCount: 3000,
    });
  });

  it('should send correct json response', async () => {
    mockRequest.body = {
      startDate: '2016-11-01',
      endDate: '2016-12-01',
      minCount: 1000,
      maxCount: 3000,
    };

    await recordService.getRecords(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(200);
    expect(mockResponse.json).toBeCalledWith({
      code: 0,
      msg: 'Success',
      records: dummyRecors,
    });
  });

  it('should send correct 404 error with empty array if there is no records', async () => {
    mockRequest.body = {
      startDate: '2016-11-01',
      endDate: '2016-12-01',
      minCount: 1000,
      maxCount: 3000,
    };

    recordRepository.getRecords = jest.fn().mockResolvedValue([]);

    await recordService.getRecords(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(404);
    expect(mockResponse.json).toBeCalledWith({
      code: 404,
      msg: 'There is no record!',
      records: [],
    });
  });

  it('should send correct 500 if there is any exceptions', async () => {
    mockRequest.body = {
      startDate: '2016-11-01',
      endDate: '2016-12-01',
      minCount: 1000,
      maxCount: 3000,
    };

    recordRepository.getRecords = jest
      .fn()
      .mockRejectedValue(new Error('There is an error!'));

    await recordService.getRecords(mockRequest, mockResponse);

    expect(mockResponse.json).toBeCalledTimes(1);
    expect(mockResponse.status).toBeCalledWith(500);
    expect(mockResponse.json).toBeCalledWith({
      code: 500,
      msg: 'Oh! There is an problem.',
      error: 'There is an error!',
    });
  });
});
