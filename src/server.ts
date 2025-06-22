import app from './app';
import { myDB } from './db/connection';

(async () => {
  await myDB.getDB();
  app.listen(3000, () => console.log('Server running on port 3000'));
})();