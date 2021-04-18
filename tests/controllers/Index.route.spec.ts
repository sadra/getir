import { dbRunner } from '../utils/db.runner';
import { app } from '../../src/bin/app';
import request from 'supertest';

describe('Index Route', () => {
  dbRunner();

  it('should recieved ok message when call Get /', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.text).toEqual('Hi! I am Getir :)');
  });

  it('should recieve 400 error if paramters not passed', (done) => {
    request(app)
      .post('/')
      .send({})
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            code: 400,
            msg: 'Bad Request!',
            error: expect.arrayContaining([expect.any(String)]),
          }),
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should recieve 200 with correct response if inputs ok', (done) => {
    request(app)
      .post('/')
      .send({
        startDate: '2020-10-01',
        endDate: '2020-12-01',
        minCount: 2000,
        maxCount: 3000,
      })
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            code: 0,
            msg: 'Success',
            records: expect.arrayContaining([
              expect.objectContaining({
                key: expect.any(String),
                createdAt: expect.any(String),
                totalCount: expect.any(Number),
              }),
            ]),
          }),
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
