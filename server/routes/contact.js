import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { sendContactNotification } from '../utils/emailService.js';

const router = express.Router();

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  try {
    const { name, email, subject, message, type = 'general' } = req.body;

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      type: type.trim(),
    });

    await newContact.save();

    // Send notification email (non-blocking)
    sendContactNotification({
      name,
      email,
      subject,
      message,
      type,
      id: newContact._id,
    }).catch(err =>
      console.error('Failed to send contact notification:', err)
    );

    res.status(201).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      data: {
        id: newContact._id,
        status: newContact.status,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit your message. Please try again later.',
    });
  }
});

// @route   GET /api/contact/stats
// @desc    Get contact form statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });

    const typeStats = await Contact.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const statusStats = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        typeStats,
        statusStats,
      },
    });
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics',
    });
  }
});

export default router;
