import mongoose, { Schema, Document } from 'mongoose';

export interface IGame extends Document {
    playerId: mongoose.Types.ObjectId;
    secretCode: number[];
    attempts: {
        guess: number[];
        bulls: number;
        pgias: number;
        createdAt: Date;
    }[];
    status: 'in-progress' | 'won' | 'lost' | 'ended';
    maxAttempts: number;
    winner: boolean;
    createdAt: Date;
}

const GameSchema: Schema = new Schema({
    playerId: { type: Schema.Types.ObjectId, required: true },
    secretCode: { type: [Number], required: true },
    attempts: [{
        guess: { type: [Number], required: true },
        bulls: { type: Number, required: true },
        pgias: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    status: { type: String, enum: ['in-progress', 'won', 'lost', 'ended'], required: true },
    maxAttempts: { type: Number, required: true },
    winner: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const GameModel = mongoose.model<IGame>('Game', GameSchema);
