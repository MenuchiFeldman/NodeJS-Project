import { Router, Request, Response } from 'express';
import GameService from './game.service';

const router = Router();

// יצירת משחק חדש
router.post('/start', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const gameId = await GameService.createGame(username, password);
    res.status(201).json({ gameId });
});

// שליחת ניחוש
router.post('/:gameId/guess', async (req: Request, res: Response) => {
    const { guess } = req.body;
    const result = await GameService.submitGuess(req.params.gameId, guess);
    res.json(result);
});

// סטטוס משחק
router.get('/:gameId', async (req: Request, res: Response) => {
    const status = await GameService.getGameStatus(req.params.gameId);
    res.json(status);
});

// סיום משחק
router.post('/:gameId/end', async (req: Request, res: Response) => {
    const result = await GameService.endGame(req.params.gameId);
    res.json(result);
});

// תוצאות אחרונות
router.get('/players/:playerId/recent', async (req: Request, res: Response) => {
    const results = await GameService.getRecentResults(req.params.playerId);
    res.json(results);
});

// דירוג שחקנים
router.get('/players/leaderboard', async (req: Request, res: Response) => {
    const leaderboard = await GameService.getLeaderboard();
    res.json(leaderboard);
});

export default router;
