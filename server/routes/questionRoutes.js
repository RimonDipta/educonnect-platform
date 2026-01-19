const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getQuestions,
  getQuestionById,
} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getQuestions).post(protect, createQuestion);
router.route('/:id').get(getQuestionById);

module.exports = router;
