import {ISearchResult} from "../entities/CommonTypes";
import {Response} from "express";

export class ResponseHelper {
    public static sedError(error:string|string[],res:Response){
        let errors:string;
        if(Array.isArray(error)){
            errors = error.join(",");
        }else {
            errors=error;
        }
        res.send({
        err:errors,
        data:null
        })
    }
    public static sedData(data:any,res:Response){
        res.send({
            err:"",
            data
        })
    }
    public static sedPageData<T>(result:ISearchResult<T>,res:Response){
    if(result.errors.length>0){
        this.sedError(result.errors,res);
    }else{
        res.send({
            err:"",
            data:result.data,
            total:result.count
        })
    }}
}