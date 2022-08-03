import express from 'express';
import generateResponseMessage from '../global/index.js';
import ReviewModel from '../models/Review.js';

const reviewRoute = express.Router();

reviewRoute.get('/', async (req, res) => {
    const reviews = await ReviewModel.find().populate('users').exec();
    res.status(200).json( generateResponseMessage(200, null, reviews));
});

reviewRoute.post('/add', async (req, res) => {
    const newreview = await ReviewModel(req.body);
    await newreview.save();
    res.status(200).json( generateResponseMessage(200, 'new review added', newreview));
});

export default reviewRoute;