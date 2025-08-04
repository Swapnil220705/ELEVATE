import express from 'express';
import { body, validationResult } from 'express-validator';
import Member from '../models/Member.js';
import { sendWelcomeEmail } from '../utils/emailService.js';

const router = express.Router();

// Validation rules
const memberValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('year')
    .isIn(['1st', '2nd', '3rd', '4th', 'graduate'])
    .withMessage('Please select a valid academic year'),
  body('motivation')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Motivation must be between 10 and 1000 characters'),
  body('interests')
    .isArray({ min: 1 })
    .withMessage('Please select at least one area of interest')
];

// @route   POST /api/members/join
// @desc    Register a new member
// @access  Public
router.post('/join', memberValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      year,
      interests,
      experience,
      motivation,
      phone,
      github,
      linkedin
    } = req.body;

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: 'A member with this email already exists'
      });
    }

    const newMember = new Member({
      name,
      email,
      year,
      interests,
      experience: experience || 'beginner',
      motivation,
      phone,
      github,
      linkedin
    });

    await newMember.save();

    // Send welcome email
    sendWelcomeEmail(email, name).catch(err =>
      console.error('Failed to send welcome email:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to Elevate Dev Club.',
      data: {
        id: newMember._id,
        name: newMember.name,
        email: newMember.email,
        status: newMember.status
      }
    });

  } catch (error) {
    console.error('Member registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again later.'
    });
  }
});

// @route   GET /api/members/stats
// @desc    Get member statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments({ status: 'approved' });
    const pendingMembers = await Member.countDocuments({ status: 'pending' });

    const interestStats = await Member.aggregate([
      { $match: { status: 'approved' } },
      { $unwind: '$interests' },
      { $group: { _id: '$interests', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const yearStats = await Member.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$year', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalMembers,
        pendingMembers,
        interestStats,
        yearStats
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// @route   GET /api/members/check-email/:email
// @desc    Check if email is already registered
// @access  Public
router.get('/check-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const existingMember = await Member.findOne({
      email: email.toLowerCase()
    }).select('email status');

    res.json({
      success: true,
      exists: !!existingMember,
      status: existingMember?.status || null
    });

  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check email'
    });
  }
});

export default router;
