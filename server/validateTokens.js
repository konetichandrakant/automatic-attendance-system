const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const validateTokens = (token) => {
  const token = req.headers.authorization;
  const { userId, type } = jsonwebtoken.verify(token, ACCESS_TOKEN, { algorithms: 'HS256' })
  req.body['userId'] = userId;
  req.body['type'] = type;
}

module.exports = { validateTokens }