import 'reflect-metadata';
import {IsInt, Min} from "class-validator";
import {Type} from "class-transformer";
import {BaseEntities} from "./BaseEntities";


export class SearchCondition extends BaseEntities{
    @IsInt({message:"pagenum should be int"})
    @Min(1,{message:"pagenum min 1"})
    @Type(()=>Number)
    public page:number=1;
    @IsInt({message:"limit num should be int"})
    @Min(1,{message:"limit num min 1"})
    @Type(()=>Number)
    public limit:number=10;
    @Type(()=>String)
    public  key:string = "";
    public static transform(plainObject:object):SearchCondition{
        return super.baseTransform(SearchCondition,plainObject);
    }

}