import 'dotenv/config';
import app from './app.js';
import connectDatabase from './config/db.js';

const port = Number(process.env.PORT || 4000);

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
