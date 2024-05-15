import multer from 'multer';
import randomstring from 'randomstring';

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		var rm = randomstring.generate(5)
		cb(null, rm + "-" + file.originalname)
	}
})

const upload = multer({ storage: storage });

export default upload;
