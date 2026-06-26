// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL;

await mongoose.connect(DATABASE_URL);
console.log('connected to db');

const app = express();

app.use(cors());
app.use(express.json());
const port = 3000

app.get('/items', async (req, res) => {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const orderBy = req.query.orderBy || 'recent';
    const keyword = req.query.keyword || '';

    const filter = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
          ],
        }
      : {};

    const order = orderBy === "favorite"
      ? {
        favoriteCount: -1
      }
      : {
        createdAt : -1
      };

    const items = await Product.find(filter)
        .sort(order)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    const totalCount = (await Product.find(filter)).length;
    const itemResponse = {
        list : items,
        totalCount: totalCount
    }

    res.send(itemResponse);
});

app.get('/items/:id', async (req, res) => {
    const targetId = req.params.id;
    const item = await Product.findById(targetId);

    res.send(item);
});

app.post('/items', async (req, res) => {
  try {
    const newItem = await Product.create(req.body);
    res.status(201).send(newItem);

  } catch (error) {
    console.error(error);
    res.status(400).send({
      message: '상품 등록 실패',
      error: error.message,
    });
  }
});

app.patch('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return res.status(404).send({
        message: '상품을 찾을 수 없습니다.',
      });
    }

    res.send(updatedItem);
  } catch (error) {
    res.status(400).send({
      message: '상품 수정 실패',
      error: error.message,
    });
  }
});

app.delete('/items/:id', async (req, res) => {
  const targetId = req.params.id;

  try {
    const deletedItem = await Product.findByIdAndDelete(targetId);

    if (!deletedItem) {
      return res.status(404).send({
        message: '상품을 찾을 수 없습니다.',
      });
    }

    res.send({
      message: '상품이 삭제되었습니다.',
      item: deletedItem,
    });
  } catch (error) {
    res.status(400).send({
      message: '상품 삭제 실패',
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});