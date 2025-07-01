import { Request, Response, NextFunction } from 'express';

export const validateGuess = (req: Request, res: Response, next: NextFunction) => {
    const { guess } = req.body;

    if (!Array.isArray(guess) || guess.length !== 4) {
        return res.status(400).json({ error: 'ניחוש חייב להיות מערך באורך 4' });
    }

    if (!guess.every(num => typeof num === 'number' && num >= 1 && num <= 9)) {
        return res.status(400).json({ error: 'הניחוש חייב להכיל מספרים בין 1 ל-9' });
    }

    const uniqueNumbers = new Set(guess);
    if (uniqueNumbers.size !== guess.length) {
        return res.status(400).json({ error: 'הניחוש לא יכול להכיל מספרים חוזרים' });
    }

    next();
};
