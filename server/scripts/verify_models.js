const mongoose = require('mongoose');
const User = require('../models/User');
const Question = require('../models/Question');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Reputation = require('../models/Reputation');

async function testModels() {
  console.log('--- Verifying Models ---');
  try {
    console.log('User Model:', User.modelName);
    console.log('Question Model:', Question.modelName);
    console.log('Chat Model:', Chat.modelName);
    console.log('Message Model:', Message.modelName);
    console.log('Reputation Model:', Reputation.modelName);
    console.log('SUCCESS: All models loaded correctly.');
    process.exit(0);
  } catch (error) {
    console.error('FAILED: Model loading error', error);
    process.exit(1);
  }
}

testModels();
