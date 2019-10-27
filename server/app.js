import express from 'express';
import bodyparser from 'body-parser';
import '@babel/polyfill';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import swaggerDoc from '../doc.json';
import tokenVerify from './middleware/checkauth';
import userRoute from './routes/userRoute';
import propertyRoute from './routes/propertyRoute';
import response from './helpers/responses';

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  response.success(res, 200, 'Welcome to PropertyPro Lite!');
});

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/property', tokenVerify, propertyRoute);

app.use('/api/v1/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use((req, res) => {
  response.error(res, 404, 'Not Found');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);

export default app;
