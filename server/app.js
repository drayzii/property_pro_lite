import express from 'express';
import bodyparser from 'body-parser';
import '@babel/polyfill';
import tokenVerify from './middleware/checkauth';
import userRoute from './routes/userRoute';
import propertyRoute from './routes/propertyRoute';

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'Welcome to PropertyPro Lite!',
  });
});

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/property', tokenVerify, propertyRoute);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);

export default app;
