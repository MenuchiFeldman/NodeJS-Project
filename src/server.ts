import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/MasterMind_DB')
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });