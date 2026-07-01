const request = require('supertest');
const app = require('../src/index');

describe('BandFinder API Tests', () => {
  let authToken;
  let createdBandId;

  // Auth Tests
  describe('POST /api/auth/register', () => {
    it('should register a new user and return token', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          name: 'Test User',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user).toHaveProperty('email');
      expect(res.body.user).toHaveProperty('name');
      authToken = res.body.token;
    });

    it('should return 422 for invalid registration data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: '123',
          name: '',
        });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('error', 'Validation failed.');
      expect(res.body).toHaveProperty('details');
    });
  });

  describe('POST /api/auth/login', () => {
    const testEmail = `login-test${Date.now()}@example.com`;

    beforeAll(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: testEmail,
          password: 'password123',
          name: 'Login Test User',
        });
    });

    it('should login and return token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: 'password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    it('should return 401 for wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: 'wrongpassword',
        });

      expect(res.statusCode).toBe(401);
    });
  });

  // Band Tests
  describe('GET /api/bands', () => {
    it('should return 200 and paginated array of bands', async () => {
      const res = await request(app).get('/api/bands');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('pagination');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toHaveProperty('total');
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('limit');
      expect(res.body.pagination).toHaveProperty('totalPages');
    });

    it('should support filtering by city', async () => {
      const res = await request(app).get('/api/bands?city=Warszawa');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data');
    });

    it('should support pagination parameters', async () => {
      const res = await request(app).get('/api/bands?page=1&limit=5');

      expect(res.statusCode).toBe(200);
      expect(res.body.pagination.limit).toBe(5);
    });
  });

  describe('GET /api/bands/:id', () => {
    it('should return 404 for non-existent band', async () => {
      const res = await request(app).get('/api/bands/99999');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/bands', () => {
    it('should return 401 when not authenticated', async () => {
      const res = await request(app)
        .post('/api/bands')
        .send({
          name: 'Test Band',
          city: 'Kraków',
          genre: 'Jazz',
          instrumentNeeded: 'Saksofon',
          description: 'Szukamy saksofonisty.',
          contactEmail: 'test@band.com',
        });

      expect(res.statusCode).toBe(401);
    });

    it('should create a band when authenticated', async () => {
      // First register to get a token
      const authRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `bandcreator${Date.now()}@example.com`,
          password: 'password123',
          name: 'Band Creator',
        });

      const token = authRes.body.token;

      const res = await request(app)
        .post('/api/bands')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Band',
          city: 'Kraków',
          genre: 'Jazz',
          instrumentNeeded: 'Saksofon',
          description: 'Szukamy saksofonisty do zespołu jazzowego.',
          contactEmail: 'test@band.com',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Test Band');
      expect(res.body.city).toBe('Kraków');
      createdBandId = res.body.id;
    });

    it('should return 422 for invalid band data', async () => {
      const authRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `validator${Date.now()}@example.com`,
          password: 'password123',
          name: 'Validator Test',
        });

      const res = await request(app)
        .post('/api/bands')
        .set('Authorization', `Bearer ${authRes.body.token}`)
        .send({
          name: '',
          city: '',
        });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('details');
    });
  });

  // Health Check
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });
});
