export const ownerSelect = {
  id: true,
  nickname: true,
  image: true,
};

export const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: ownerSelect,
  },
};

export function createCommentsSelect(commentLimit) {
  return {
    orderBy: {
      createdAt: "desc",
    },
    take: commentLimit + 1,
    select: commentSelect,
  };
}

export function createLikeSelect(likeField, userId) {
  return {
    _count: {
      select: {
        [likeField]: true,
      },
    },

    ...(userId && {
      [likeField]: {
        where: {
          userId,
        },
        select: {
          userId: true,
        },
      },
    }),
  };
}
