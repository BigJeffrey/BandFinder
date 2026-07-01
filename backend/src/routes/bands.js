const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/bands - Get all bands
router.get('/', async (req, res) => {
  try {
    const bands = await prisma.band.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bands);
  } catch (error) {
    console.error('Error fetching bands:', error);
    res.status(500).json({ error: 'Failed to fetch bands' });
  }
});

// GET /api/bands/:id - Get band by ID
router.get('/:id', async (req, res) => {
  try {
    const band = await prisma.band.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    if (!band) {
      return res.status(404).json({ error: 'Band not found' });
    }
    res.json(band);
  } catch (error) {
    console.error('Error fetching band:', error);
    res.status(500).json({ error: 'Failed to fetch band' });
  }
});

// POST /api/bands - Create a new band
router.post('/', async (req, res) => {
  try {
    const { name, city, genre, instrumentNeeded, description, contactEmail } = req.body;

    if (!name || !city || !genre || !instrumentNeeded || !description || !contactEmail) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const band = await prisma.band.create({
      data: {
        name,
        city,
        genre,
        instrumentNeeded,
        description,
        contactEmail,
        userId: req.user?.id || 1,
      },
    });
    res.status(201).json(band);
  } catch (error) {
    console.error('Error creating band:', error);
    res.status(500).json({ error: 'Failed to create band' });
  }
});

// DELETE /api/bands/:id - Delete a band
router.delete('/:id', async (req, res) => {
  try {
    await prisma.band.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Band deleted successfully' });
  } catch (error) {
    console.error('Error deleting band:', error);
    res.status(500).json({ error: 'Failed to delete band' });
  }
});

module.exports = router;
