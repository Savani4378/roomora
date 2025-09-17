const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Add hotel
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const { name, city, state, price, type } = req.body;
  const image = req.file ? req.file.path : null;

  const hotel = new Hotel({ name, city, state, price, type, image });
  await hotel.save();
  res.json(hotel);
});

// Get all hotels
router.get('/', authMiddleware, async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

// Edit hotel
router.put('/:id', authMiddleware, async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hotel);
});

// Delete hotel
router.delete('/:id', authMiddleware, async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Hotel deleted' });
});

module.exports = router;