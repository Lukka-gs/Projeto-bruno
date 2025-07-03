import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = process.env.JWT_SECRET || 'authsecret';
const PORT = process.env.PORT || 3002;

// Serve the frontend
app.use(express.static('../frontend'));

// Mocked user credentials
const adminUser = {
  username: 'admin',
  password: 'senha123'
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1d' });
    return res.json({ access_token: token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(PORT, () => {
  console.log(`Auth service listening on port ${PORT}`);
});
