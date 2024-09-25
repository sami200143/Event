import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import eventRouter from './routes/event.route.js';
import packageRouter from './routes/package.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});

app.use('/api/event', eventRouter);
app.use('/api/package', packageRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
});