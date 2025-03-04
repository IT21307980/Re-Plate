const multer = require('multer');


//Media upload
const storage = multer.diskStorage({
    destination: ( req, file, cb) => {
        cb(null, "uploads/")
    }, 
     filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
     }
})
 
const fileFilter = (req, file, cb) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (validTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and videos are allowed!'), false);
    }
};

// Multer instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

module.exports = upload;