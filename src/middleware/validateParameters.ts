import { Request, Response, NextFunction } from 'express';

export const validatePlayer = (req: Request, res: Response, next: NextFunction) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return res.status(400).json({ error: 'מייל וסיסמה הם שדות חובה' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
        return res.status(400).json({ error: 'המייל אינו תקין' });
    }

    if (password.length < 4) {
        return res.status(400).json({ error: 'הסיסמה חייבת להכיל לפחות 4 תווים' });
    }

    next();
};