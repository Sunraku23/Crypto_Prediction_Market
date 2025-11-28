const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Format yang benar: string '30d' atau number dalam seconds
  });
};

module.exports = generateToken;