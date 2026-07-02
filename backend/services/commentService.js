import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateComment } from '../structs.js';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

//댓글 목록조회
// [ ] 댓글 등록 API를 만들어 주세요.
// [ ] content를 입력하여 댓글을 등록합니다.
// [ ] 중고마켓, 자유게시판 댓글 등록 API를 따로 만들어 주세요.
// [ ] 댓글 수정 API를 만들어 주세요.
// [ ] PATCH 메서드를 사용해 주세요.
// [ ] 댓글 삭제 API를 만들어 주세요.
// [ ] 댓글 목록 조회 API를 만들어 주세요.
// [ ] id, content, createdAt 를 조회합니다.
// [ ] cursor 방식의 페이지네이션 기능을 포함해 주세요.
// [ ] 중고마켓, 자유게시판 댓글 목록 조회 API를 따로 만들어 주세요.
export const getComments = async () => {
  return prisma.comment.findMany();
}

//게시글 단건조회
export const getCommentById = (id) => {
  return prisma.comment.findUniqueOrThrow({where: {id}});
};

//댓글 등록
export const createComment = async (data) => {
    return prisma.comment.create({ data });
}