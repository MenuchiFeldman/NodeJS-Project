import { Request, Response, NextFunction } from 'express';

export function validateGuess(req: Request, res: Response, next: NextFunction) {
  const { guess } = req.body;
  if (!Array.isArray(guess) || guess.length !== 4 || new Set(guess).size !== 4) {
    return res.status(400).json({ error: 'Guess must be an array of 4 unique numbers.' });
  }
  next();
}