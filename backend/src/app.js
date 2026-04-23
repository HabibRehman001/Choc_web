const express = require('express');
const cors = require('cors');
const imageRoutes = require('./routes/images.routes');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

app.use('/api/images', imageRoutes);

app.use((err, req, res, next) => {
  if (err && err.message === 'Only image files are allowed') {
    return res.status(400).json({ message: err.message });
  }

  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Image size exceeds 5MB limit' });
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
