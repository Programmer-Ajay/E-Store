import multer from 'multer'
import path from 'path'
const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/temp") // our local folder path name
    },
    filename:function(req,file,cb){
        cb(null ,`${Date.now()}-${file.originalname}`)
        // is yeh hoga ki orignal namr hai usse hi file savwe ho jayegi
    }
})
export const uplaod= multer({storage,
      fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
})