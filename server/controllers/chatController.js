const Chat = require('../models/Chat');
const User = require('../models/User');

// @desc    Access or create a one-on-one chat
// @route   POST /api/chats
// @access  Protected
const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log('UserId param not sent with request');
    return res.sendStatus(400);
  }

  // Check if chat exists
  var isChat = await Chat.find({
    participants: { $all: [req.user._id, userId] },
  })
    .populate('participants', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name email avatar',
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // Create new chat
    var chatData = {
      participants: [req.user._id, userId],
      unreadCounts: {
        [req.user._id]: 0,
        [userId]: 0,
      },
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'participants',
        '-password'
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

// @desc    Fetch all chats for a user
// @route   GET /api/chats
// @access  Protected
const fetchChats = async (req, res) => {
  try {
    let results = await Chat.find({ participants: { $in: [req.user._id] } })
      .populate('participants', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });

    results = await User.populate(results, {
      path: 'latestMessage.sender',
      select: 'name email avatar',
    });

    res.status(200).send(results);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = { accessChat, fetchChats };
