import { Router, Request, Response } from 'express';
import GameService from './game.service';
import { validateGuess } from '../middleware/validateGame';

const router = Router();
/**
 * @swagger
 * /games/start:
 *   post:
 *     summary: Start a new game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game started
 */
// יצירת משחק חדש
router.post('/start', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const gameId = await GameService.createGame(username, password);
    res.status(201).json({ gameId });
});
/**
 * @swagger
 * /games/{gameId}/guess:
 *   post:
 *     summary: Submit a guess for a game
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guess:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Guess result
 */
// שליחת ניחוש
router.post('/:gameId/guess', validateGuess as any, async (req: Request, res: Response) => {
    const { guess } = req.body;
    const result = await GameService.submitGuess(req.params.gameId, guess);
    res.json(result);
});
/**
 * @swagger
 * /games/{gameId}:
 *   get:
 *     summary: Get the status of a game
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game
 *     responses:
 *       200:
 *         description: Game status
 */
// סטטוס משחק
router.get('/:gameId', async (req: Request, res: Response) => {
    const status = await GameService.getGameStatus(req.params.gameId);
    res.json(status);
});
/**
 * @swagger
 * /games/{gameId}/end:
 *   post:
 *     summary: End a game
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the game
 *     responses:
 *       200:
 *         description: Game ended
 */
// סיום משחק
router.post('/:gameId/end', async (req: Request, res: Response) => {
    const result = await GameService.endGame(req.params.gameId);
    res.json(result);
});
/**
 * @swagger
 * /games/players/{playerId}/recent:
 *   get:
 *     summary: Get recent results for a player
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player
 *     responses:
 *       200:
 *         description: Recent results
 */
// תוצאות אחרונות
router.get('/players/:playerId/recent', async (req: Request, res: Response) => {
    const results = await GameService.getRecentResults(req.params.playerId);
    res.json(results);
});
/**
 * @swagger
 * /games/players/leaderboard:
 *   get:
 *     summary: Get the leaderboard
 *     responses:
 *       200:
 *         description: Leaderboard data
 */
// דירוג שחקנים
router.get('/players/leaderboard', async (req: Request, res: Response) => {
    const leaderboard = await GameService.getLeaderboard();
    res.json(leaderboard);
});

export default router;
