import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Task from "./models/Task.js";
import cors from "cors";
import seedData from "./data/seedData.js";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
console.log("DB URL:", process.env.DATABASE_URL);
await mongoose.connect(DATABASE_URL);
console.log('Connected to DB');

// await Task.deleteMany({});
// // seed 데이터 다시 삽입
// await Task.insertMany(seedData);

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get('/tasks', async (req, res) => {
  console.log("데이터를 가져옵니다");
  const sort = req.query.sort;
  const count = Number(req.query.count) || 0;

  const sortOption = { createdAt: sort === "oldest" ? 'asc' : 'desc' };
  const tasks = await Task.find({}).sort(sortOption).limit(count);

  res.send(tasks);

});

app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.get('/tasks/name/:name', async (req, res) => {
  const task = await Task.findOne({ name: req.params.name });
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given name.' });
  }
});

app.get('/tasks/price/:price', async (req, res) => {
  const task = await Task.findOne({ price: req.params.price });
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given price.' });
  }
});

app.get('/tasks/createdAt/:createdAt', async (req, res) => {
  const task = await Task.findOne({ createdAt: req.params.createdAt });
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given createdAt.' });
  }
});

app.post('/tasks', async (req, res) => {
  console.log("받은 데이터:", req.body);
  const newTask = await Task.create(req.body);
  res.status(201).send(newTask);
});

app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    Object.keys(req.body).forEach((key) => {
      task[key] = req.body[key];
    });
    await task.save();
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (task) {
    res.sendStatus(204);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.listen(process.env.PORT || 3001, () => console.log('Server Started'));

const corsOptions = {
  origin: ['http://localhost:3001', 'https://mongodb-g9dr.onrender.com'],
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.log(err);
  console.log(err, err.name);
  switch (err.name) {
    case 'ValidationError': {
      res.status(400).send({ message: err.message });
      return ;
    }
    case 'CastError': {
      res.status(404).send({ message: 'Cannot find given id.' });
      return ;
    }
    default: {
      console.error(err);
      res.status(500).send({ message: err.message });
      return ;
    }
  }
});