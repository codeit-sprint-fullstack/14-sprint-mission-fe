import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello Express!');
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log('Server Started!'));