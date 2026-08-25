import prisma from "../lib/prisma.js";

async function save({ name, description, price, tags, images, userId }) {
  return prisma.product.create({
    data: {
      name,
      description,
      price,
      tags,
      user: {
        connect: {
          id: userId,
        },
      },
      images: {
        create: images.map((path) => ({
          path,
        })),
      },
    },
    include: {
      images: {
        select: {
          path: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
}

export default {
  save,
};
