const API_URL = 'http://localhost:5000/api';

const verifyQuestions = async () => {
  try {
    // 1. Login to get token
    console.log('Logging in...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testjunior@example.com',
        password: 'password123',
      }),
    });

    if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.statusText}`);
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Login successful, token received.');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // 2. Create a Question
    console.log('Creating a question...');
    const questionRes = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        content:
          'I need help understanding Quantum Physics specifically the entanglement part.',
        subjects: ['Physics', 'Quantum Mechanics'],
        urgency: 'Urgent',
      }),
    });

    if (!questionRes.ok)
      throw new Error(`Create Question failed: ${questionRes.statusText}`);
    const questionData = await questionRes.json();
    console.log('Question created:', questionData._id);

    // 3. Get All Questions
    console.log('Fetching all questions...');
    const questionsRes = await fetch(`${API_URL}/questions`);
    const questionsData = await questionsRes.json();
    console.log(`Fetched ${questionsData.length} questions.`);

    const createdQuestion = questionsData.find(
      (q) => q._id === questionData._id
    );
    if (createdQuestion) {
      console.log('Verified created question exists in list.');
    } else {
      console.error('Created question NOT found in list!');
    }

    // 4. Get Single Question
    console.log('Fetching single question...');
    const singleRes = await fetch(`${API_URL}/questions/${questionData._id}`);
    const singleData = await singleRes.json();

    if (singleData.content === questionData.content) {
      console.log('Single question fetch verified.');
    }

    console.log('Question API Verification Complete!');
  } catch (error) {
    console.error('Verification failed:', error);
  }
};

verifyQuestions();
