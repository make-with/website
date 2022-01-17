const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
    return cb(null, true);
  }
  cb(res.status(400).end('png, jpeg 파일 형식만 업로드 가능합니다.'), false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'file',
);

module.exports = upload;
