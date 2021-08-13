import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import { getId } from '../../utils';


const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename(req, file, cb) {
      const name = getId(12)
      const extension = file.originalname.split('.');
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

uploadGallery.post((req, res) => {
  // fs.readdirSync('public/uploads').forEach((fileName) => {
  //   fs.unlinkSync(`public/uploads/${fileName}`)
  // });
  fs.writeFileSync('public/gallery.json', JSON.stringify(req.body), (err) => {
    console.log(err)
  })
  res.status(201).end();
});

export const config = {
  api: {
    bodyParser: false
  }
}

export default uploadGallery;