import express from 'express';

import userRoute from './routes/userRoute';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/auth', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Ok'));
