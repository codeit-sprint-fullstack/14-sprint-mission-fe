import express from 'express';
import multer from 'multer';
import path from 'node:path'; // 파일 확장자를 가져오기 위한 모듈
import passport from '../config/passport.js';
import imageController from '../controllers/imageController.js';

const router = express.Router();

// 이미지 저장 위치 및 파일명 설정
// dest 옵션만 주면 multer는 확장자 없는 이름으로만 저장 -> 이미지를 올려도 브라우저에 표시되지 않고 다운로드됨
// multer.diskStorage로 파일명을 직접 정해야 함

// 파일 저장 경로와 이름 설정
const storage = multer.diskStorage({
  destination: (req, file, callback) => { // 저장할 위치
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => { // 저장할 파일명과 확장자
    const extension = path.extname(file.originalname);
    const filename = `${Date.now()}${extension}`;
    callback(null, filename);
  },
});

// 업로드 가능한 파일 형식 지정
const fileFilter = (req, file, callback) => {
  const allowedTypes = ['image/webp', 'image/jpg', 'image/jpeg', 'image/png'];
  
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Only image files are allowed');
    error.code = 400;
    return callback(error); 
  }

  return callback(null, true);
}

// 파일 크기 제한
const upload = multer({ 
  storage,
  fileFilter,
  limits: { // 파일 크기 제한 (5MB)
    fileSize: 5 * 1024 * 1024,
  }, 
});

router.post(
  '/',
  passport.authenticate('access-token', { session: false }),
  upload.single('image'), // 이름이 image인 파일 하나를 찾아서 저장 (프론트에서 file input name을 image로 설정해야 함)
  imageController.uploadImage
);

/*  파일 저장 끝나면 controller req.file에 정보 저장
{
  fieldname: 'image',
  originalname: 'test.jpeg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  path: 'uploads/1787796510010.jpeg',
  destination: 'uploads/',
  filename: '1787796510010.jpeg',
  size: 5046
}
*/

export default router;