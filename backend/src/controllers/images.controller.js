const mongoose = require('mongoose');
const Image = require('../models/images.model');

const toImageResponse = (doc, req) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  return {
    id: doc._id,
    originalName: doc.originalName,
    fileName: doc.fileName,
    mimeType: doc.mimeType,
    size: doc.size,
    altText: doc.altText,
    tags: doc.tags,
    isActive: doc.isActive,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    url: `${baseUrl}/api/images/${doc._id}`,
  };
};

const parseTags = (rawTags) => {
  if (!rawTags) return [];

  if (Array.isArray(rawTags)) {
    return rawTags
      .map((tag) => String(tag).trim())
      .filter(Boolean);
  }

  return String(rawTags)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required (field name: image).' });
    }

    const image = await Image.create({
      originalName: req.file.originalname,
      fileName: req.file.filename || req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      altText: req.body.altText || '',
      tags: parseTags(req.body.tags),
      data: req.file.buffer,
    });

    return res.status(201).json({
      message: 'Image uploaded successfully',
      image: toImageResponse(image, req),
    });
  } catch (error) {
    console.error('uploadSingleImage error:', error);
    return res.status(500).json({ message: 'Failed to upload image' });
  }
};

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required (field name: images).' });
    }

    const tags = parseTags(req.body.tags);
    const altText = req.body.altText || '';

    const docs = req.files.map((file) => ({
      originalName: file.originalname,
      fileName: file.filename || file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      altText,
      tags,
      data: file.buffer,
    }));

    const inserted = await Image.insertMany(docs);

    return res.status(201).json({
      message: 'Images uploaded successfully',
      images: inserted.map((doc) => toImageResponse(doc, req)),
    });
  } catch (error) {
    console.error('uploadMultipleImages error:', error);
    return res.status(500).json({ message: 'Failed to upload images' });
  }
};

const getImages = async (req, res) => {
  try {
    const { tag, active, limit } = req.query;
    const filter = {};

    if (typeof active !== 'undefined') {
      filter.isActive = active === 'true';
    }

    if (tag) {
      filter.tags = tag;
    }

    const parsedLimit = Number(limit);
    const queryLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 100;

    const images = await Image.find(filter)
      .sort({ createdAt: -1 })
      .limit(queryLimit)
      .select('-data');

    return res.status(200).json({
      count: images.length,
      images: images.map((image) => toImageResponse(image, req)),
    });
  } catch (error) {
    console.error('getImages error:', error);
    return res.status(500).json({ message: 'Failed to fetch images' });
  }
};

const getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid image id' });
    }

    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.setHeader('Content-Type', image.mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(image.data);
  } catch (error) {
    console.error('getImageById error:', error);
    return res.status(500).json({ message: 'Failed to fetch image' });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid image id' });
    }

    const deleted = await Image.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('deleteImage error:', error);
    return res.status(500).json({ message: 'Failed to delete image' });
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  getImages,
  getImageById,
  deleteImage,
};
