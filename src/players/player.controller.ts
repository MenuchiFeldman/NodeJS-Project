import { Router, Request, Response } from 'express';
import PlayerService from './player.service';
import { validatePlayer } from '../middleware/validateParameters';

const router = Router();

router.post('/register',validatePlayer, async (req: Request, res: Response) => {
    const { name, password, mail } = req.body;
    const player = await PlayerService.registerPlayer(name, password, mail);
    res.status(201).json(player);
});


router.get('/:playerId/guesses', async (req: Request, res: Response) => {
    const history = await PlayerService.getGuessHistory(req.params.playerId);
    if (!history) 
        return res.status(404).send('History not found');
    res.json(history);
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const player = await PlayerService.findPlayer(req.params.id);
        if (!player) 
            return res.status(404).send('Player not found');
        res.json(player);
    } catch (err) {
        res.status(500).send('Error finding player');
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedPlayer = await PlayerService.updatePlayer(req.params.id, req.body);
        if (!updatedPlayer) {
            return res.status(404).send('Player not found');
        }
        res.json(updatedPlayer);
    } catch (err) {
        res.status(500).send('Error updating player');
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await PlayerService.deletePlayer(req.params.id);
        if (!deleted) {
            return res.status(404).send('Player not found');
        }
        res.status(200).json({ message: "Player deleted successfully", id: req.params.id });
    } catch (err) {
        res.status(500).send('Error deleting player');
    }
});

export default router;
