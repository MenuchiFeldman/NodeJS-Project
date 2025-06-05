import { Player } from './player.model';

export default class PlayerService {
    /**
     * 1. הרשמה של שחקן חדש
     */
    static async registerPlayer(username: string, password: string) {
        const secretCode = this.generateSecretCode();
        const player = new Player({ username, password, secretCode });
        await player.save();
        return player.toJSON();
    }

    /**
     * 2. חיפוש היסטוריית ניחושים של שחקן
     */
    static async getGuessHistory(playerId: string) {
        const player = await Player.findById(playerId).lean();
        return player ? player.guessHistory : null;
    }

    /**
     * 3. שליחת ניחוש
     */
    static async submitGuess(playerId: string, guess: number[]) {
        const player = await Player.findById(playerId);
        
        if (!player) {
            throw new Error('Player not found');
        }
    
        const bulls = player.secretCode.filter((num, index) => num === guess[index]).length;
        const pgias = guess.filter(num => player.secretCode.includes(num)).length - bulls;
    
        player.guessHistory.push({ guess, result: { bulls, pgias } });
        await player.save();
        return { bulls, pgias };
    }

    

    /**
     * 4. יצירת קוד סודי רנדומלי
     */
    static generateSecretCode(): number[] {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        const secretCode: number[] = []; // הגדרת סוג המערך כ-number[]
        
        while (secretCode.length < 4) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            secretCode.push(numbers[randomIndex]);
            numbers.splice(randomIndex, 1);
        }
        
        return secretCode;
    }
}
