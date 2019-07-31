import Express from "express";
import {MovieService} from "../services/MovieService";
import {ResponseHelper} from "./ResponseHelper";
const router = Express.Router();

router.get("/:id",async (req,res)=>{
    try{
        const movieid = req.params.id;
        const movie = await MovieService.findById(movieid);
        ResponseHelper.sedData(movie,res);
    }catch (e) {
        ResponseHelper.sedData(null,res);
    }
});
router.get("/",async (req,res)=>{
    const result = await MovieService.find(req.query);
    ResponseHelper.sedPageData(result,res);
});
router.post("/",async (req,res)=>{
    console.log(req)
    const result = await MovieService.add(req.body);
    if(Array.isArray(result)){
        ResponseHelper.sedError(result,res);
    }else {
        ResponseHelper.sedData(result,res);
    }
});
router.put("/:id",async (req,res)=>{
    try{
        const movidid = req.params.id;
        const result = await MovieService.edit(movidid,req.body);
        if(result.length>0){
            ResponseHelper.sedData(result,res);
        }else {
            ResponseHelper.sedData(true,res);
        }

    }catch (e) {
        ResponseHelper.sedError("id wrong",res);
    }
});
router.delete("/:id",async (req,res)=>{
    try{
        const movidid = req.params.id;
        await MovieService.delete(movidid);
        ResponseHelper.sedData(true,res);
    }catch (e) {
        ResponseHelper.sedError("id wrong",res);
    }
});
export default router;