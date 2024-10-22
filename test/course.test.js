const request = require('supertest');
const app = require('../app');
const server = app.listen(3001);

describe('GET /courses', () => {
  it('should return a list of courses', async () => {
    const response = await request(server).get('/courses');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /courses/:id', () => {
  it('should return a single course by id', async () => {
    const response = await request(server).get('/courses/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });
});

afterAll(() => {
  server.close();
});