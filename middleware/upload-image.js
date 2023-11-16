import multer from "multer";

const destination = (req, file, callback)=>{
    callback(null, 'public/assets');
}

const filename = (req, file, callback)=>{
    callback(null, file.originalname);
}

const storage = multer.diskStorage({
    destination,
    filename,
});

const upload = multer({storage});

export default upload;