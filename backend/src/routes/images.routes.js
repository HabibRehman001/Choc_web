const express = require('express');
const upload = require('../middlewares/upload.middleware');
const {
  uploadSingleImage,
  uploadMultipleImages,
  getImages,
  getImageById,
  deleteImage,
} = require('../controllers/images.controller');

const router = express.Router();

router.get('/', getImages);
router.get('/:id', getImageById);
router.post('/upload', upload.single('image'), uploadSingleImage);
router.post('/upload-multiple', upload.array('images', 20), uploadMultipleImages);
router.delete('/:id', deleteImage);

module.exports = router;
