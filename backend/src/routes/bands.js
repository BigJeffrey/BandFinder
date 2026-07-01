const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createBandValidation, updateBandValidation } = require('../validators/bandValidators');

const router = express.Router();
const prisma = new PrismaClient();

// GET / - List all bands with optional filters and pagination
router.get('/', async (req, res, next) => {
  try {
    const { city, genre, instrumentNeeded, search, page = 1, limit = 10 } = req.query;

    const where = {};

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }
    if (genre) {
      where.genre = { contains: genre, mode: 'insensitive' };
    }
    if (instrumentNeeded) {
      where.instrumentNeeded = { contains: instrumentNeeded, mode: 'insensitive' };
    }
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [bands, total] = await Promise.all([
      prisma.band.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.band.count({ where }),
    ]);

    res.json({
      data: bands,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /:id - Get band by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const band = await prisma.band.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!band) {
      return res.status(404).json({ error: 'Band not found.' });
    }

    res.json(band);
  } catch (error) {
    next(error);
  }
});

// POST / - Create a new band (auth required)
router.post('/', auth, validate(createBandValidation), async (req, res, next) => {
  try {
    const { name, city, genre, instrumentNeeded, description, contactEmail } = req.body;

    const band = await prisma.band.create({
      data: {
        name,
        city,
        genre,
        instrumentNeeded,
        description,
        contactEmail,
        userId: req.user.id,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(201).json(band);
  } catch (error) {
    next(error);
  }
});

// PUT /:id - Update a band (auth required, owner only)
router.put('/:id', auth, validate(updateBandValidation), async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingBand = await prisma.band.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBand) {
      return res.status(404).json({ error: 'Band not found.' });
    }

    if (existingBand.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own band listings.' });
    }

    const { name, city, genre, instrumentNeeded, description, contactEmail } = req.body;

    const updatedBand = await prisma.band.update({
      where: { id: parseInt(id) },
      data: { name, city, genre, instrumentNeeded, description, contactEmail },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.json(updatedBand);
  } catch (error) {
    next(error);
  }
});

// DELETE /:id - Delete a band (auth required, owner only)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingBand = await prisma.band.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBand) {
      return res.status(404).json({ error: 'Band not found.' });
    }

    if (existingBand.userId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own band listings.' });
    }

    await prisma.band.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
