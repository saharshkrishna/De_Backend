import mongoose from 'mongoose';

const offerschema = new mongoose.schema ({
    title: { type: String, required: true },
    description: {type: String, required:true},
    Image: { type: String, required: true },
    price: { type: Number, required: true },
})