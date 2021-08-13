import nextConnect from 'next-connect';
import multer from 'multer';
import { getId } from '../../utils';


const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename(req, file, cb) {
      const name = getId(12)
      const extension = file.originalname.split('.');
      console.log(file)
      cb(null, `${name}.${extension[extension.length - 1]}`);
    },
  });
  const upload = multer({ storage, limits: { fileSize: 2048 * 1024 }});
  

const uploadMiddleware = upload.any('files')

const uploadGallery = nextConnect({
    // Handle any other HTTP method
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
uploadGallery.use(uploadMiddleware)
// Process a POST request
uploadGallery.post((req, res) => {
console.log(Object.keys(req), req.body)
res.status(200).json({ data: 'success' });
});

export const config = {
  api: {
    bodyParser: false
  }
}

  export default uploadGallery;