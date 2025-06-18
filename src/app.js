import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
app.use(express.json());

// Routes
app.use('/users', usersRouter);

// middleware/server connection

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;