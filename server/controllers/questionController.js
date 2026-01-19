const Question = require('../models/Question');
const User = require('../models/User');

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private
const createQuestion = async (req, res) => {
  try {
    const { content, subjects, urgency, institution } = req.body;

    if (!content || !subjects || subjects.length === 0) {
      return res
        .status(400)
        .json({ message: 'Content and subjects are required' });
    }

    const question = await Question.create({
      author: req.user.id,
      content,
      subjects,
      urgency: urgency || 'Normal',
      institution: institution || req.user.institution, // Default to user's institution
    });

    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all questions (with filters)
// @route   GET /api/questions
// @access  Public (or Private? Let's keep it Public for browsing, but detailed view might need auth)
const getQuestions = async (req, res) => {
  try {
    const { subject, urgency, status } = req.query;
    let query = {};

    if (subject) {
      query.subjects = { $in: [subject] };
    }

    if (urgency) {
      query.urgency = urgency;
    }

    if (status) {
      query.status = status;
    } else {
      // Default to not showing resolved/expired if not specified?
      // Or just show all open/in-progress by default
      query.status = { $in: ['Open', 'In Progress'] };
    }

    const questions = await Question.find(query)
      .populate('author', 'name institution') // Populate author details
      .sort({ createdAt: -1 }); // Newest first

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      'author',
      'name institution'
    );

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
};
