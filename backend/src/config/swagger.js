const swaggerUi = require('swagger-ui-express');

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'BandFinder API',
    version: '1.0.0',
    description: 'REST API for BandFinder - a platform connecting musicians with bands looking for new members.',
    contact: {
      name: 'BandFinder Team',
    },
  },
  servers: [
    {
      url: '/api',
      description: 'API Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token obtained from /auth/login or /auth/register',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          name: { type: 'string', example: 'Jan Kowalski' },
        },
      },
      Band: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Rock Legends' },
          city: { type: 'string', example: 'Warszawa' },
          genre: { type: 'string', example: 'Rock' },
          instrumentNeeded: { type: 'string', example: 'Gitara basowa' },
          description: { type: 'string', example: 'Szukamy basisisty do zespołu rockowego.' },
          contactEmail: { type: 'string', format: 'email', example: 'band@example.com' },
          createdAt: { type: 'string', format: 'date-time' },
          userId: { type: 'integer', example: 1 },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      BandInput: {
        type: 'object',
        required: ['name', 'city', 'genre', 'instrumentNeeded', 'description', 'contactEmail'],
        properties: {
          name: { type: 'string', example: 'Rock Legends' },
          city: { type: 'string', example: 'Warszawa' },
          genre: { type: 'string', example: 'Rock' },
          instrumentNeeded: { type: 'string', example: 'Gitara basowa' },
          description: { type: 'string', example: 'Szukamy basisisty do zespołu rockowego.' },
          contactEmail: { type: 'string', format: 'email', example: 'band@example.com' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      RegisterInput: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', minLength: 6, example: 'password123' },
          name: { type: 'string', example: 'Jan Kowalski' },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          password: { type: 'string', example: 'password123' },
        },
      },
      PaginatedBands: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/Band' },
          },
          pagination: {
            type: 'object',
            properties: {
              total: { type: 'integer', example: 25 },
              page: { type: 'integer', example: 1 },
              limit: { type: 'integer', example: 10 },
              totalPages: { type: 'integer', example: 3 },
            },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Error message' },
        },
      },
      ValidationError: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Validation failed.' },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Please provide a valid email address.' },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Bands', description: 'Band management endpoints' },
    { name: 'Health', description: 'Health check endpoint' },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Check if the API is running',
        responses: {
          200: {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        description: 'Create a new user account and receive a JWT token',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } } },
        },
        responses: {
          201: { description: 'User registered successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          400: { description: 'User already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          422: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        description: 'Authenticate a user and receive a JWT token',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } },
        },
        responses: {
          200: { description: 'Login successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
          401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          422: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
        },
      },
    },
    '/bands': {
      get: {
        tags: ['Bands'],
        summary: 'List all bands',
        description: 'Get a paginated list of band listings with optional filters',
        parameters: [
          { name: 'city', in: 'query', description: 'Filter by city', schema: { type: 'string' } },
          { name: 'genre', in: 'query', description: 'Filter by genre', schema: { type: 'string' } },
          { name: 'instrumentNeeded', in: 'query', description: 'Filter by instrument needed', schema: { type: 'string' } },
          { name: 'search', in: 'query', description: 'Search by band name', schema: { type: 'string' } },
          { name: 'page', in: 'query', description: 'Page number', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', description: 'Results per page', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          200: { description: 'List of bands', content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedBands' } } } },
        },
      },
      post: {
        tags: ['Bands'],
        summary: 'Create a new band listing',
        description: 'Create a new band listing (authentication required)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/BandInput' } } },
        },
        responses: {
          201: { description: 'Band created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Band' } } } },
          401: { description: 'Not authenticated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          422: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
        },
      },
    },
    '/bands/{id}': {
      get: {
        tags: ['Bands'],
        summary: 'Get band by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Band details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Band' } } } },
          404: { description: 'Band not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      put: {
        tags: ['Bands'],
        summary: 'Update a band listing',
        description: 'Update an existing band listing (owner only)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/BandInput' } } },
        },
        responses: {
          200: { description: 'Band updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Band' } } } },
          401: { description: 'Not authenticated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          403: { description: 'Not owner', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          422: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
        },
      },
      delete: {
        tags: ['Bands'],
        summary: 'Delete a band listing',
        description: 'Delete a band listing (owner only)',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          204: { description: 'Band deleted' },
          401: { description: 'Not authenticated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          403: { description: 'Not owner', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
  },
};

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'BandFinder API Documentation',
  }));
};

module.exports = { swaggerSpec, setupSwagger };
