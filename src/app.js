import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
app.use(express.json());

// Routes
app.use('/users', usersRouter);

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;