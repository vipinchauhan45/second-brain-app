import express from 'express';
import Content from '../models/Content.js';
import authenticateToken from '../middlewares/auth.js';

const contentRouter = express.Router();

// Create new content
contentRouter.post('/create', authenticateToken, async (req, res) => {
  const { _id } = req.user;
  const { title, description, type, url, file, tags } = req.body;

  try {
    const newContent = await Content.create({
      user: _id,
      title,
      description,
      type,
      url,
      file,
      tags,
    });

    const token = req.header('Authorization')?.replace('Bearer ', '');

    res.status(201).json({
      message: 'Content created successfully',
      content: newContent,
      token: token,
    });
  } catch (e) {
    console.error('Error creating content:', e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all contents of the logged-in user
contentRouter.get('/allContent', authenticateToken, async (req, res) => {
  try {
    const contents = await Content.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(contents);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch content' });
  }
});

// Get a specific content by ID (for logged-in user)
contentRouter.get('/:id', authenticateToken, async (req, res) => {
  try {
    const content = await Content.findOne({ _id: req.params.id, user: req.user._id });
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.status(200).json(content);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching content' });
  }
});

// Update content
contentRouter.put('/:id', authenticateToken, async (req, res) => {
  const updates = req.body;
  try {
    const content = await Content.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true }
    );
    if (!content) return res.status(404).json({ message: 'Content not found or unauthorized' });
    res.status(200).json({ message: 'Content updated', content });
  } catch (e) {
    res.status(500).json({ message: 'Error updating content' });
  }
});

// Delete content
contentRouter.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await Content.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!result) return res.status(404).json({ message: 'Content not found or unauthorized' });
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Error deleting content' });
  }
});

// Get shared content by public shareId (if implemented)
contentRouter.get('/share/:shareId', async (req, res) => {
  try {
    const sharedContent = await Content.findOne({ shareId: req.params.shareId });
    if (!sharedContent) return res.status(404).json({ message: 'Shared content not found' });
    res.status(200).json(sharedContent);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch shared content' });
  }
});

export default contentRouter;
