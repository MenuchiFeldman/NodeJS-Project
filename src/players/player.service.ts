import  Game  from '../games/game.model';
import  {PlayerModel} from '../players/player.model';
import { IPlayer } from '../players/player.model';

class PlayerService {
static async getGuessHistory(playerId: string) {
    const games = await Game.find({ playerId });
    if (!games || games.length === 0) {
        throw new Error('No games found for this player');
    }
    const player = await PlayerModel.findById(playerId);
    if (!player) {
        throw new Error('Player not found');
    }
    return {
        wins: player.wins,
        guesses: games.flatMap(game => game.attempts)
    };
}

    static generateSecretCode(): number[] {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        const secretCode: number[] = []; 

        while (secretCode.length < 4) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            secretCode.push(numbers[randomIndex]);
            numbers.splice(randomIndex, 1);
        }

        return secretCode;
    }

 static async registerPlayer(name: string, password: string, mail: string): Promise<IPlayer> {
    const newPlayer = new PlayerModel({
        name,
        password,
        mail,
        totalGames: 0,
        wins: 0
    });
    return await newPlayer.save();
}

static async updatePlayer(id: string, updateData: Partial<IPlayer>): Promise<IPlayer | null> {
    const updatedPlayer = await PlayerModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );
    if (!updatedPlayer) {
        throw new Error('Player not found');
    }
    return updatedPlayer;
}
static async deletePlayer(id: string): Promise<boolean> {
    const result = await PlayerModel.findByIdAndDelete(id);
    return !!result;
}
    static async findPlayer(playerId:string): Promise<IPlayer | null> {
        const player = await PlayerModel.findById(playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        return player;

    }

}

export default PlayerService;
