import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { appError } from './appError.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "_" + file.originalname);
    }
});

function fileFilter(req, file, cb) {
    
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new appError('PDF files only', 400), false);
    }
}


const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

export default upload;