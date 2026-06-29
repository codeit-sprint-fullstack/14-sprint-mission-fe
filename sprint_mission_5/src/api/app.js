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

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get('/tasks', async (req, res) => {
  console.log("데이터를 가져옵니다");
  const sort = req.query.sort;
  const { keyword, name, price, createdAt } = req.query;

  const limit = Number(req.query.limit) || 10;   // 페이지당 개수
  const page = Number(req.query.page) || 1;      // 현재 페이지
  const offset = (page - 1) * limit;             // 건너뛸 개수

  // Search 조건
  let filter = {};
  if (name) filter.name = name;
  if (price) filter.price = Number(price);
  if (createdAt) filter.createdAt = new Date(createdAt);
  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ];
  }

  const sortOption = { createdAt: sort === "oldest" ? 'asc' : 'desc' };

  try {
    const tasks = await Task.find(filter)
      .sort(sortOption)
      .skip(offset)
      .limit(limit);

    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const { name, price, createdAt } = req.query;
    let filter = {};

    if (name) filter.name = name;
    if (price) filter.price = Number(price); // 문자열을 숫자로 변환
    if (createdAt) filter.createdAt = new Date(createdAt);

    const tasks = await Task.find(filter);

    if (tasks.length > 0) {
      res.send(tasks);
    } else {
      res.status(404).send({ message: 'Cannot find given condition.' });
    }
  } catch (err) {
    res.status(500).send(err);
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