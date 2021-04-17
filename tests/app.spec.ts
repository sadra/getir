import { app } from '../src/bin/app';
import request from 'supertest';

describe('Server e2e Test', () => {
  it('should recieved ok message', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.text).toEqual('Hi! I am Getir :)');
  });
});
