import createHttpError from "./createHttpError.js";

export function assertOwner(
  resource,
  userId,
  notFoundMessage,
  forbiddenMessage,
) {
  if (!resource) {
    throw createHttpError(404, notFoundMessage);
  }

  if (resource.ownerId !== userId) {
    throw createHttpError(403, forbiddenMessage);
  }

  return resource;
}
