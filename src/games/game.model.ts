import mongoose, { Schema, Document } from 'mongoose';

interface IAttempt {
    guess: number[];
    bulls: number;
    pgias: number;
    createdAt: Date;
}

interface IGame extends Document {
    playerId: mongoose.Types.ObjectId;
    secretCode: number[];
    attempts: IAttempt[];
    status: 'in-progress' | 'won' | 'lost' | 'ended';
    maxAttempts: number;
    winner: boolean;
    createdAt: Date;
}

const AttemptSchema: Schema = new Schema({
    guess: { type: [Number], required: true },
    bulls: { type: Number, required: true },
    pgias: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const GameSchema: Schema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // הוספת שדה _id מותאם אישית
    playerId: { type: Schema.Types.ObjectId, required: true, ref: 'Player' },
    secretCode: { type: [Number], required: true },
    attempts: [AttemptSchema],
    status: { type: String, enum: ['in-progress', 'won', 'lost', 'ended'], default: 'in-progress' },
    maxAttempts: { type: Number, required: true },
    winner: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Game = mongoose.model<IGame>('Game', GameSchema);
export default Game;
