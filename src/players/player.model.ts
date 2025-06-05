import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
    username: string;
    password: string;
    secretCode: number[];
    guessHistory: { guess: number[], result: { bulls: number, pgias: number } }[];
}

const playerSchema = new Schema<IPlayer>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        secretCode: { type: [Number], required: true },
        guessHistory: { type: [{ guess: [Number], result: { bulls: Number, pgias: Number } }], default: [] },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Player = mongoose.model<IPlayer>('Player', playerSchema);
