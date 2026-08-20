import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const updatedComment = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      content,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(200).json(updatedComment);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.comment.delete({
    where: {
      id,
    },
  });

  res.sendStatus(204);
});

export default router;
