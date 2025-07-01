import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
    name: string;
    password: string;
    mail: string;
    totalGames: number;
    wins: number;
}

const playerSchema = new Schema<IPlayer>(
    {
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mail: { type: String, required: true, unique: true },
        totalGames: { type: Number, default: 0 },
        wins: { type: Number, default: 0 }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
export const PlayerModel = mongoose.model<IPlayer>('Player', playerSchema);
