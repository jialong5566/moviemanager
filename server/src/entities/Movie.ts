import 'reflect-metadata';
import {ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, validate} from "class-validator";
import {plainToClass, Type} from "class-transformer";
import {BaseEntities} from "./BaseEntities";

export class Movie extends BaseEntities{
    @IsNotEmpty({message:"name of Movie can not be empty"})
    @Type(()=>String)
    public name: string;

    @IsNotEmpty({message:"Category can not be empty"})
    @ArrayMinSize(1,{message:"At least one category should be defined"})
    @IsArray({message:"types should be an array"})
    @Type(()=>String)
    public types: string[];

    @IsNotEmpty({message:"Area can not be empty"})
    @ArrayMinSize(1,{message:"At least one area should be defined"})
    @IsArray({message:"areas should be an array"})
    @Type(()=>String)
    public areas: string[];

    @IsNotEmpty({message:"Duration can not be null"})
    @IsInt({message:"duration must be an integer"})
    @Min(1,{message:"too short,1 min"})
    @Max(180,{message:" too  long"})
    @Type(()=>Number)
    public duration:number;

    @IsNotEmpty({message:"ishot can not be empty"})
    @Type(()=>Boolean)
    public isHot:boolean = false;
    @IsNotEmpty({message:"ishot can not be empty"})
    @Type(()=>Boolean)
    public isComing:boolean = false;
    @IsNotEmpty({message:"ishot can not be empty"})
    @Type(()=>Boolean)
    public isClassic:boolean = false;
    @Type(()=>String)
    public description?:string;
    @Type(()=>String)
    public poster?:string;


    public static transform(plainObject:object):Movie{
        return super.baseTransform(Movie,plainObject);
    }
}