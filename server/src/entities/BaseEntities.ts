import {validate} from "class-validator";
import {plainToClass} from "class-transformer";
import {Movie} from "./Movie";
import {ClassType} from "class-transformer/ClassTransformer";

export abstract class BaseEntities {
    public async validateThis(skipMissing:boolean):Promise<string[]>{
        const errors = await validate(this,{
            skipMissingProperties:skipMissing
        });
        const temp = errors.map(e=>(Object.values(e.constraints)));
        const result:string[] = [];
        temp.forEach(item=>{
            result.push(...item);
        })
        return result;
    }
    protected static baseTransform<T>(cls:ClassType<T>,plainObject:object):T{
        return (plainObject instanceof cls)?plainObject:plainToClass(cls,plainObject);
    }
}