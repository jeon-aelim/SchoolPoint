const multer = require("multer");
const path = require('path');
// 이미지 받았을 때 필터링
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG|GIF)$/)) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

var storage = multer.diskStorage({
   destination: (req, file, cb) => {
     // 서버에 저장될 위치
     cb(null, path.resolve(__dirname, "/images"))
   },

  filename: (req, file, cb) => {
    // 서버에 저장될 때 파일 이름
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  }
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter }).single(
  // 프론트에서 넘겨울 params key 값, 오른쪽 같이 넘겨줘야함-> {photo: binary}
  'user_approve_img'
);

var uploadMultiFile = multer({ storage: storage, fileFilter: imageFilter }).array(
  'img',10
);
module.exports = {uploadFile,uploadMultiFile};