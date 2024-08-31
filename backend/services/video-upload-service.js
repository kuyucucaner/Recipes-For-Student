const multer = require('multer');
const path = require('path');

// Video dosyalarının saklanacağı dizini belirleyin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos'); // Path where videos will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // dosya ismi
  },
});

const videoUpload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: (req, file, cb) => {
      const fileTypes = /mp4|mkv|avi|jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
      }
    }
  }).fields([{ name: 'video', maxCount: 1 }]);
  

module.exports = videoUpload;
