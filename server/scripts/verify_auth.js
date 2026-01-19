const http = require('http');

async function postData(url, data) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          console.log(`Status: ${res.statusCode}`);
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTest() {
  const baseUrl = 'http://localhost:5000/api/auth';

  // 1. Register
  console.log('--- Testing Registration ---');
  const user = {
    name: 'Test Student',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    institution: 'Test Uni',
    department: 'CSE',
    academicLevel: 'University',
    role: 'Senior',
  };

  try {
    const regRes = await postData(`${baseUrl}/register`, user);
    console.log('Registration Response:', regRes);

    if (!regRes.token) {
      console.error('FAILED: No token returned on registration');
      process.exit(1);
    }

    // 2. Login
    console.log('\n--- Testing Login ---');
    const loginRes = await postData(`${baseUrl}/login`, {
      email: user.email,
      password: user.password,
    });
    console.log('Login Response:', loginRes);

    if (!loginRes.token) {
      console.error('FAILED: No token returned on login');
      process.exit(1);
    }

    console.log('\nSUCCESS: Auth flow verified!');
  } catch (error) {
    console.error('Test Failed:', error);
    process.exit(1);
  }
}

// Wait for server to start
setTimeout(runTest, 3000);
