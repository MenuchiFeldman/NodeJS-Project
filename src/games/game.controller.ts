import { Router, Request, Response } from 'express';
import GameService from './game.service';
import PlayerService from '../players/player.service';
import { validatePlayer } from '../middleware/validateParameters';
import { validateGuess } from '../middleware/validateGame';

import bcrypt from 'bcrypt';

const router = Router();

router.post('/start', async (req: Request, res: Response) => {
    const { playerId } = req.body; 
    const gameId = await GameService.createGame(playerId);
    res.status(201).json({ gameId });
});

router.post('/:gameId/guess', validateGuess, async (req: Request, res: Response) => {
    const { guess } = req.body;
    const result = await GameService.submitGuess(req.params.gameId, guess);
    res.json(result);
});

router.get('/:gameId', async (req: Request, res: Response) => {
    const status = await GameService.getGameStatus(req.params.gameId);
    res.json(status);
});

router.post('/:gameId/end', async (req: Request, res: Response) => {
    const result = await GameService.endGame(req.params.gameId);
    res.json(result);
});

router.get('/players/:playerId/recent', async (req: Request, res: Response) => {
    const results = await GameService.getRecentResults(req.params.playerId);
    res.json(results);
});

router.get('/players/leaderboard', async (req: Request, res: Response) => {
    const leaderboard = await GameService.getLeaderboard();
    res.json(leaderboard);
});

export default router;
