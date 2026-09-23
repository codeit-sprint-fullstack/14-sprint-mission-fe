export function createOrderBy(orderBy, likeField) {
  return orderBy === "likes"
    ? [
        {
          [likeField]: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ]
    : [
        {
          createdAt: "desc",
        },
      ];
}
