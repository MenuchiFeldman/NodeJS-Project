import { GameModel } from './game.model';
import { BullPgia } from './game.logic';
import { PlayerModel } from '../players/player.model';

export default class GameService {
    static async createGame(username: string, password: string) {
        const player = await PlayerModel.findOne({ username, password });
        if (!player) {
            throw new Error('Player not found or password incorrect');
        }
        const secretCode = this.generateSecretCode();
        const game = new GameModel({
            playerId: player._id,
            secretCode,
            attempts: [],
            status: 'in-progress',
            maxAttempts: 10
        });
        await game.save();
        return game._id;
    }

    // static async createGame(username: string, password: string) {
    //     const secretCode = this.generateSecretCode();
    //     const game = new GameModel({ playerId: username, secretCode, attempts: [], status: 'in-progress', maxAttempts: 10 });
    //     await game.save();
    //     return game._id;
    // }
    static async submitGuess(gameId: string, guess: number[]) {
        const game = await GameModel.findById(gameId);
        if (!game) {
            throw new Error('Game not found');
        }
    
        const { bulls, pgias } = BullPgia.calculateBullsAndPgias(game.secretCode, guess);
        game.attempts.push({ guess, bulls, pgias, createdAt: new Date() });
        game.status = (bulls === game.secretCode.length) ? 'won' : (game.attempts.length >= game.maxAttempts) ? 'lost' : game.status;
    
        await game.save();
    
        const remainingAttempts = game.maxAttempts - game.attempts.length;
    
        return { bulls, pgias, remainingAttempts, status: game.status };
    }
    
    static async getGameStatus(gameId: string) {
        const game = await GameModel.findById(gameId);
        return game;
    }

    static async endGame(gameId: string) {
        const game = await GameModel.findByIdAndUpdate(gameId, { status: 'ended' }, { new: true });
        return game;
    }

    static async getRecentResults(playerId: string) {
        const recentGames = await GameModel.find({ playerId, status: 'ended' })
            .sort({ updatedAt: -1 }) // מיין לפי תאריך עדכון, מהחדש לישן
            .limit(10); // קח את 10 המשחקים האחרונים
        return recentGames;
    }    

    static async getLeaderboard() {
        const leaderboard = await GameModel.aggregate([
            { $match: { status: 'ended' } },
            { $group: { _id: '$playerId', wins: { $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] } } } },
            { $sort: { wins: -1 } }, // מיין לפי מספר הניצחונות
            { $limit: 10 } // קח את 10 השחקנים המובילים
        ]);
        return leaderboard;
    }
    

    static generateSecretCode(): number[] {
        const secretCode: number[] = [];
        while (secretCode.length < 4) { // לדוגמה, קוד באורך 4
            const digit = Math.floor(Math.random() * 10); // מספר בין 0 ל-9
            if (!secretCode.includes(digit)) { // לוודא שאין כפילויות
                secretCode.push(digit);
            }
        }
        return secretCode;
    }
}
