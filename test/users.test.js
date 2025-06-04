import { describe, it, beforeEach, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Users API', () => {
  it('should return an empty list initially', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    const res = await request(app).post('/users').send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(user);
  });
});