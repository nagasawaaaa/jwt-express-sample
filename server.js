const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verify');

const app = express();

app.use(express.json());
app.use(cors());

let todos = [
  { id: 1, text: 'Todo 1' },
  { id: 2, text: 'Todo 2' },
  { id: 3, text: 'Todo 3' }
];

app.get('/api/todos', verifyToken, (req, res) => {
  // ログイン成功時にはtodoを返す
  res.status(200).json({todos});
});

app.post('/api/login', (req, res) => {
  if (req.body.email === 'taro@example.com' && req.body.password === 'taro123') {
    const user = { id: '1', username: 'taro' };
    jwt.sign(
      { user },  // payload
      'secret123',  // 秘密キー
      { expiresIn: 60 },  // 60秒後に失効
      (err, token) => {
      if (err) {
        res.status(500).json({
          message: 'Could not create token'
        });
      } else {
        // ログイン成功
        res.status(200).json({ token });
      }
    });
  } else {
    res.status(401).json({
      message: 'Login failed'
    });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
