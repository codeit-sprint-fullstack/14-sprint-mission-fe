export const productKeys = {
  all: ["products"],
  lists: () => [...productKeys.all, "list"],
  list: (params) => [...productKeys.lists(), params],
  details: () => [...productKeys.all, "detail"],
  detail: (id) => [...productKeys.details(), String(id)],
};

export const commentKeys = {
  all: ["comments"],
  lists: () => [...commentKeys.all, "list"],
  list: (productId) => [...commentKeys.lists(), String(productId)],
};

export const userKeys = {
  all: ["users"],
  me: () => [...userKeys.all, "me"],
};
