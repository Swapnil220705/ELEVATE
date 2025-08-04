import express from 'express';
import { body, validationResult } from 'express-validator';
import Event from '../models/Event.js';

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type = 'all', limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    let query = { isActive: true };
    
    if (type === 'upcoming') {
      query.date = { $gte: new Date() };
    } else if (type === 'past') {
      query.date = { $lt: new Date() };
    }

    const events = await Event.find(query)
      .sort({ date: type === 'past' ? -1 : 1 })
      .limit(parseInt(limit))
      .skip(skip)
      .select('-registeredAttendees');

    const totalEvents = await Event.countDocuments(query);

    res.json({
      success: true,
      data: {
        events,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalEvents / limit),
          totalEvents,
          hasNext: skip + events.length < totalEvents,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Events fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .select('-registeredAttendees.email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: event
    });

  } catch (error) {
    console.error('Event fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Public
router.post('/:id/register', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email } = req.body;
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (!event.isRegistrationOpen) {
      return res.status(400).json({
        success: false,
        message: 'Registration is closed for this event'
      });
    }

    const alreadyRegistered = event.registeredAttendees.some(
      attendee => attendee.email === email
    );

    if (alreadyRegistered) {
      return res.status(409).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }

    if (event.maxAttendees && event.attendeeCount >= event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'Event is full. Registration closed.'
      });
    }

    event.registeredAttendees.push({ name, email });
    await event.save();

    res.json({
      success: true,
      message: 'Successfully registered for the event!',
      data: {
        eventTitle: event.title,
        attendeeCount: event.attendeeCount
      }
    });

  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again later.'
    });
  }
});

// @route   GET /api/events/stats/overview
// @desc    Get events statistics
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments({ isActive: true });
    const upcomingEvents = await Event.countDocuments({ 
      isActive: true, 
      date: { $gte: new Date() } 
    });
    const pastEvents = await Event.countDocuments({ 
      isActive: true, 
      date: { $lt: new Date() } 
    });

    const categoryStats = await Event.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const totalRegistrations = await Event.aggregate([
      { $match: { isActive: true } },
      { $project: { attendeeCount: { $size: '$registeredAttendees' } } },
      { $group: { _id: null, total: { $sum: '$attendeeCount' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalEvents,
        upcomingEvents,
        pastEvents,
        categoryStats,
        totalRegistrations: totalRegistrations[0]?.total || 0
      }
    });

  } catch (error) {
    console.error('Events stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events statistics'
    });
  }
});

export default router;
