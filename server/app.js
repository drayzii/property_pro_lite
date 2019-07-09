import express from 'express';
import cookieParser from 'cookie-parser';

import tokenVerify from './config/checkauth';
import userRoute from './routes/userRoute';
import propertyRoute from './routes/propertyRoute';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/property', tokenVerify, propertyRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Ok'));
