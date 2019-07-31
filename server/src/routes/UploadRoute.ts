import Express from "express";
import {extname,resolve} from "path";
import multer from "multer";
import {ResponseHelper} from "./ResponseHelper";


const router = Express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,resolve(__dirname,"../../public/upload") )
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+extname(file.originalname))
    }
})
const allowedExt = [".jpg",".gif",".png",".bmp"];
const upload = multer({
    storage,
    limits:{
        fileSize:1024*1024
    },
    fileFilter(req: Express.Request, file, callback: (error: (Error | null), acceptFile: boolean) => void): void {
        const ext = extname(file.originalname);
        if(allowedExt.includes(ext)){
            callback(null,true);

        }else {
            callback(new Error("文件类型不正确"),false)
        }

    }
}).single("imgfile");

router.post("/",(req,res)=>{
    upload(req,res,err=>{
        if(err){
            ResponseHelper.sedError(err.message,res)
        }else {
            const url = `/upload/${req.file.filename}`
            ResponseHelper.sedData(url,res)
        }
    })
})

export default router;