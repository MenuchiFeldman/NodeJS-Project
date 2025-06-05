import { Router, Request, Response } from 'express';
import service from './player.service';

const router = Router();

// הרשמה של שחקן חדש
router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const player = await service.registerPlayer(username, password);
    res.status(201).json(player);
});

// קבלת היסטוריית ניחושים של שחקן
router.get('/:playerId/guesses', async (req: Request, res: Response) => {
    const history = await service.getGuessHistory(req.params.playerId);
    if (!history) 
        return res.status(404).send('History not found');
    res.json(history);
});

// שליחת ניחוש
router.post('/:playerId/guess', async (req: Request, res: Response) => {
    const { guess } = req.body;
    const result = await service.submitGuess(req.params.playerId, guess);
    res.json(result);
});

export default router;
