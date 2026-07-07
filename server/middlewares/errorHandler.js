import { Prisma } from "@prisma/client"

export default function errorHandler(err, req, res, next) {
  if (
    err.name === 'StructError' || 
    err instanceof Prisma.PrismaClientValidationError
  ) {
    res.status(400).send({ message: err.message })
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    res.status(404).send({ message: 'Cannot find given id.' })
  } else {
    console.error(err)
    res.status(500).send({ message: err.message })
  }
}