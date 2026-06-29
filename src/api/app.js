import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Task from "./models/Task.js";
import cors from "cors";
import seedData from "./data/seedData.js";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:3003", 
    "http://localhost:5173", 
    "http://localhost:5174",
    "https://<frontend>.onrender.com" // 실제 배포된 프론트엔드 주소
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"], // ← 여기 추가
  credentials: true
};

app.use(cors(corsOptions));




dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
console.log("DB URL:", process.env.DATABASE_URL);
await mongoose.connect(DATABASE_URL);
console.log('Connected to DB');



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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`BackEnd Server running on port ${port}`);
});~



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