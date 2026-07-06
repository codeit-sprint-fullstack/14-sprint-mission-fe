import { Prisma } from '@prisma/client'

function errorHandler(err, req, res, next) {
  if (
    err.name === 'StructError' ||
    // A instanceof B = A가 B라는 클래스(설계도)로 만들어졌는가?
    err instanceof Prisma.PrismaClientValidationError
  ) {
    res.status(400).send({ message: err.message })
  } else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    // err는 KnownRequestError 클래스로 만들어진 객체이다
    // 그러므로 err.code로 해당 에러의 프로퍼티에 접근해 값 P2025인지 찾을 수 있다
    err.code === 'P2025'
  ) {
    res.sendStatus(404)
  } else {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}

export default errorHandler
