import Mongoose from 'mongoose';
import {Movie} from "../entities/Movie";

export interface IMovie extends Movie,Mongoose.Document{}
const movieSchema = new Mongoose.Schema<IMovie>({//此处泛型为检测movieSchema 类型的
    name:String,        //以下为运行中的变量检查
    types:[String],
    areas:[String],
    duration:Number,
    isHot:Boolean,
    isComing:Boolean,
    isClassic:Boolean,
    description:String,
    poster:String,
},{
    versionKey:false,
})

export default Mongoose.model<IMovie>("Movie",movieSchema);