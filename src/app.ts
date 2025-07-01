import express from 'express';
import gameRoutes from './games/game.controller';
import playerRoutes from './players/player.controller';

const app = express();

app.use(express.json());

app.use('/api/games', gameRoutes);
app.use('/api/players', playerRoutes);

export default app;