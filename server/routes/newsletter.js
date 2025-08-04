import express from 'express';
import { body, validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter.js'; // Make sure this path and `.js` is correct

const router = express.Router();

// Validation rules
const newsletterValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', newsletterValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
        errors: errors.array()
      });
    }

    const { email, name, source = 'website' } = req.body;

    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(409).json({
          success: false,
          message: 'This email is already subscribed to our newsletter'
        });
      } else {
        existingSubscriber.isActive = true;
        existingSubscriber.unsubscribedAt = undefined;
        existingSubscriber.subscribedAt = new Date();
        if (name) existingSubscriber.name = name;

        await existingSubscriber.save();

        return res.json({
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.'
        });
      }
    }

    const newSubscriber = new Newsletter({
      email,
      name,
      source
    });

    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter! 🎉'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Subscription failed. Please try again later.'
    });
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', newsletterValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list'
      });
    }

    if (!subscriber.isActive) {
      return res.json({
        success: true,
        message: 'You are already unsubscribed from our newsletter'
      });
    }

    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.json({
      success: true,
      message: 'Successfully unsubscribed from our newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Unsubscription failed. Please try again later.'
    });
  }
});

// @route   GET /api/newsletter/stats
// @desc    Get newsletter statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments({ isActive: true });
    const totalUnsubscribed = await Newsletter.countDocuments({ isActive: false });

    const sourceStats = await Newsletter.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalSubscribers,
        totalUnsubscribed,
        sourceStats
      }
    });

  } catch (error) {
    console.error('Newsletter stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch newsletter statistics'
    });
  }
});

export default router;
