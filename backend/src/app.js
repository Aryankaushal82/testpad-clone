import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import testRoute from './routes/test.route.js'
import testGiven from './routes/testGiven.route.js'

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.ALLOWED_URL
}))
app.use('/api/v1/test',testRoute);
app.use('/api/v1/testGiven',testGiven);

export {app};