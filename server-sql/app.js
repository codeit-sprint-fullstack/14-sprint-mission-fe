import 'dotenv/config';
import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import cors from 'cors';
import { assert } from 'superstruct';
import { CreateItem, PatchItem, CreateArticle, PatchArticle, CreateComment, PatchComment } from './struct.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3003;


// Item model CRUD endpoint 정의
app.get('/tasks', async (req, res) => {
  const { page = 1, pageSize = 10, orderBy = 'recent' , keyword } = req.query;
  
  let order;
  switch (orderBy) {
    case 'oldest':
      order = { createdAt: 'asc' };
      break;
    case 'recent':
    default:
      order = { createdAt: 'desc' };
      break;
  } 

  const query = {};
  if(keyword) { 
        query.OR = [
          { name: { contains: keyword, mode: 'insensitive' }},
          { description: { contains: keyword, mode: 'insensitive' }}
        ];
  }

  const totalCount = await prisma.item.count({
    where: query,
  });

  const itemList = await prisma.item.findMany({
    where: query,
    orderBy: order,
    skip: parseInt((page - 1) * pageSize),
    take: parseInt(pageSize),
    select: { name: true, price: true, createdAt: true, tags: true },
  });

  res.send({items: itemList, totalCount});
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const item = await prisma.item.findUniqueOrThrow({
    where: { id },
    include: { tags : true },
  })
  res.send(item);
});

app.post('/tasks', async (req, res) => {
  assert(req.body, CreateItem);
  const { tags, price,  ...itemFields } = req.body;

  let arrayTags = [];
  if(!Array.isArray(tags)){
    arrayTags =  tags.split(",").map((tag) => tag.trim()).filter(t => t);
  } else {
    arrayTags = tags;
  }

  const response = await prisma.item.create({
    data: {
      ...itemFields,
      price: parseFloat(price),
      tags: { connectOrCreate: arrayTags.map((tag) => ({
        where: { tagName: tag },
        create: { tagName: tag },
      }))},
    },
    include: { tags: true },
  });
  res.status(201).send(response);
});

app.patch('/tasks/:id', async (req, res) => {
  assert(req.body, PatchItem);

  const { id } = req.params;
  const { tags, price, ...itemFields } = req.body;
  
  let isTags = {};
  if(tags) {
    let arrayTags = [];

    if(!Array.isArray(tags)){
      arrayTags =  tags.split(",").map((tag) => tag.trim()).filter(t => t);
    } else {
      arrayTags = tags;
    }

    isTags = {  
        set: [],
        connectOrCreate: arrayTags.map((tag) => ({
          where: { tagName: tag },
          create: { tagName: tag },
        }))}
  } else {
    isTags = undefined
  }

  let isPrice = {}
  if(price){
    isPrice = parseFloat(price);
  } else {
    isPrice = undefined;
  }

  const response = await prisma.item.update({
    where: { id },
    data: {
      ...itemFields,
      price: isPrice,
      tags: isTags,
      },
    include: { tags: true },
    });
  res.send(response);
});

app.delete('/tasks/:id', async (req, res) => {
  //해당 아이디를 다 삭제 //해당하는 태그도 연결을 끊어야함.
  const { id } = req.params;
  await prisma.item.delete({
    where: { id },
  });
  res.sendStatus(204);
});

// Item model CRUD endpoint 정의
app.get('/tasks/:itemId/comments', async (req, res) =>{
  const { itemId } = req.params;
  const { cursor , limit = 10 } = req.query;

  const comments = await prisma.marketComment.findMany({
    where: { itemId },
    cursor: cursor? { id: cursor } : undefined,
    skip: cursor? 1 : 0,
    take: parseInt(limit),
    select: { id: true, content: true, createdAt: true }
  })

  let nextCursor;
  if(comments.length === 0){
    nextCursor = undefined;
  } else {
    nextCursor = comments[comments.length -1].id;
  }

  res.send({comments, nextCursor});
});

app.post('/tasks/:itemId/comments', async (req, res) => {
  const { itemId } = req.params;
  assert(req.body, CreateComment);
  const response = await prisma.marketComment.create({
    data: { 
      ...req.body, 
      itemId
    } 
  })
  res.status(201).send(response);
});

app.patch('/tasks/:itemId/comments/:id', async (req, res) => {
  assert(req.body, PatchComment);
  const { id } = req.params;
  const response = await prisma.marketComment.update({
    where: { id },
    data: req.body,
  })
  res.send(response);
});

app.delete('/tasks/:itemId/comments/:id', async (req, res) => {
  const { id } = req.params;
  const response = await prisma.marketComment.delete({
    where: { id }
  })
  res.sendStatus(204);
})

// Article model CURD endpoint 정의
app.get('/articles', async (req, res) => {
  const { offset = 0, limit = 10, orderBy = 'recent', keyword } = req.query;

  let order;
  switch (orderBy) {
    case 'recent':
      order = { createdAt: 'desc' }
      break;
    case 'oldest':
    default:
      order = { createdAt: 'asc' }
      break;
  }

  const query = {};
  if(keyword){
    query.OR = [
      {title: { contains: keyword, mode: 'insensitive' }},
      {content: { contains: keyword, mode: 'insensitive' }},
    ]
  }

  const articles = await prisma.article.findMany({
    where: query,
    skip: parseInt(offset),
    take: parseInt(limit),
    orderBy: order,
    select: { id : true, title: true, content: true, createdAt: true },
  })

  res.send(articles);
});

app.get('/articles/:id', async (req, res) => {
  const { id } = req.params;

  const article = await prisma.article.findUniqueOrThrow({
    where: { id },
    select: { id : true, title: true, content: true, createdAt: true },
  })
  res.send(article);
});

app.post('/articles', async (req, res) => {
  assert(req.body, CreateArticle);
  const response = await prisma.article.create({ data: req.body });
  res.status(201).send(response);
});

app.patch('/articles/:id', async (req, res) => {
  assert(req.body, PatchArticle);

  const { id } = req.params;
  const { title, content } = req.body;

  const response = await prisma.article.update({
    where: { id },
    data: { title, content },
  })

  res.send(response);
});

app.delete('/articles/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.article.delete({ 
    where: { id },
  })
  res.sendStatus(204);
});

// Article Comment CRUD endpoint 정의
app.get('/articles/:articleId/comments', async (req, res) =>{
  const { articleId } = req.params;
  const { cursor , limit = 10 } = req.query;

  const comments = await prisma.articleComment.findMany({
    where: { articleId },
    cursor: cursor? { id: cursor } : undefined,
    skip: cursor? 1 : 0,
    take: parseInt(limit),
    select: { id: true, content: true, createdAt: true }
  })

  let nextCursor;
  if(comments.length === 0){
    nextCursor = undefined;
  } else {
    nextCursor = comments[comments.length -1].id;
  }

  res.send({comments, nextCursor});
});

app.post('/articles/:articleId/comments', async (req, res) => {
  const { articleId } = req.params;
  assert(req.body, CreateComment);
  const response = await prisma.articleComment.create({
    data: { 
      ...req.body, 
      articleId
    } 
  })
  res.status(201).send(response);
});

app.patch('/articles/:articleId/comments/:id', async (req, res) => {
  assert(req.body, PatchComment);
  const { id } = req.params;
  const response = await prisma.articleComment.update({
    where: { id },
    data: req.body,
  })
  res.send(response);
});

app.delete('/articles/:articleId/comments/:id', async (req, res) => {
  const { id } = req.params;
  const response = await prisma.articleComment.delete({
    where: { id }
  })
  res.sendStatus(204);
})


//미들웨어 오류체크
app.use((err, req, res, next) => {
  if (
    err.name === 'StructError' ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    res.status(400).send({ message: err.message });
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    res.sendStatus(404);
  } else {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});


app.listen(PORT, () => console.log(`server started on port ${PORT}`));

