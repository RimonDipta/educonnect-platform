// Native fetch is used (Node 18+)

const API_URL = 'http://127.0.0.1:5000/api';

const user1 = {
  name: 'Chat User 1',
  email: `chat1_${Date.now()}@example.com`,
  password: 'password123',
  institution: 'Test University',
  department: 'Computer Science',
  academicLevel: 'University',
};

const user2 = {
  name: 'Chat User 2',
  email: `chat2_${Date.now()}@example.com`,
  password: 'password123',
  institution: 'Test University',
  department: 'Mathematics',
  academicLevel: 'University',
};

let token1, token2, userId1, userId2, chatId;

async function registerUser(user) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

async function loginUser(user) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email, password: user.password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

async function run() {
  try {
    console.log('Registering users...');
    const u1 = await registerUser(user1);
    const u2 = await registerUser(user2);

    token1 = u1.token;
    userId1 = u1._id;
    token2 = u2.token;
    userId2 = u2._id;

    console.log(`Users registered: ${userId1} and ${userId2}`);

    // 1. Access/Create Chat (User 1 -> User 2)
    console.log('User 1 creating chat with User 2...');
    const chatRes = await fetch(`${API_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token1}`,
      },
      body: JSON.stringify({ userId: userId2 }),
    });
    const chatData = await chatRes.json();
    if (!chatRes.ok)
      throw new Error(chatData.message || 'Failed to create chat');

    chatId = chatData._id;
    console.log(`Chat created/accessed: ${chatId}`);

    // 2. Send Message (User 1)
    console.log('User 1 sending message...');
    const msgRes = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token1}`,
      },
      body: JSON.stringify({ chatId, content: 'Hello User 2!' }),
    });
    const msgData = await msgRes.json();
    if (!msgRes.ok)
      throw new Error(msgData.message || 'Failed to send message');
    console.log(`Message sent: ${msgData.content}`);

    // 3. User 2 fetches chats
    console.log('User 2 fetching chats...');
    const chatsRes = await fetch(`${API_URL}/chats`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token2}` },
    });
    const chatsData = await chatsRes.json();
    if (!chatsRes.ok) throw new Error('Failed to fetch chats');

    const foundChat = chatsData.find((c) => c._id === chatId);
    if (!foundChat) throw new Error('Chat not found in User 2 list');
    console.log('User 2 found the chat in list.');

    // 4. User 2 getting messages
    console.log('User 2 fetching messages...');
    const historyRes = await fetch(`${API_URL}/messages/${chatId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token2}` },
    });
    const historyData = await historyRes.json();
    if (!historyRes.ok) throw new Error('Failed to fetch history');

    const foundMsg = historyData.find((m) => m.content === 'Hello User 2!');
    if (!foundMsg) throw new Error('Message not found in history');
    console.log('User 2 retrieved message successfully.');

    console.log('Chat API Verification Complete!');
  } catch (error) {
    console.error('Test Failed:', error.message);
    process.exit(1);
  }
}

run();
