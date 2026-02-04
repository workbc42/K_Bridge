const register = (req, res) => {
  const { email, name, phone, language } = req.body || {};

  res.status(201).json({
    success: true,
    user: {
      id: 1,
      email: email || 'user@example.com',
      name: name || 'New User',
      phone: phone || '+82-10-0000-0000',
      language: language || 'en',
    },
    message: 'Register endpoint is stubbed. Replace with DB-backed implementation.',
  });
};

const login = (req, res) => {
  const { email } = req.body || {};

  res.json({
    success: true,
    token: 'demo-token',
    user: {
      id: 1,
      email: email || 'user@example.com',
      name: 'Demo User',
    },
    message: 'Login endpoint is stubbed. Replace with real auth.',
  });
};

const me = (req, res) => {
  res.json({
    success: true,
    user: {
      id: 1,
      email: 'user@example.com',
      name: 'Demo User',
      language: 'en',
    },
  });
};

module.exports = {
  register,
  login,
  me,
};
