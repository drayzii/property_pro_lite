import express from 'express';
import cookieParser from 'cookie-parser';

import propertyRoute from './routes/propertyRoute';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/property', propertyRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Ok'));
