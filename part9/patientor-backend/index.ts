import express from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server ready on ${PORT}`);
});
