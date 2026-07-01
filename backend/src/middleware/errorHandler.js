const { Prisma } = require('@prisma/client');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Prisma unique constraint violation
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = err.meta?.target?.join(', ') || 'field';
      return res.status(409).json({
        error: `A record with this ${field} already exists.`,
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Record not found.',
      });
    }
  }

  // Prisma validation error
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: 'Invalid data provided.',
    });
  }

  // Express-validator errors
  if (err.type === 'validation') {
    return res.status(422).json({
      error: 'Validation failed.',
      details: err.errors,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token has expired.',
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.message || 'Internal server error.',
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
