import Express from "express";
import MovieRouter from "./routes/MovieRoute";
import UploadRouter from "./routes/UploadRoute";
const app = Express();
import history from "connect-history-api-fallback";

app.use(history());
app.use(Express.json());
app.use("/api/movie",MovieRouter);
app.use("/api/upload",UploadRouter)
app.use("/",Express.static("public/build"));
app.use("/upload",Express.static("public/upload"));

app.listen(3000,()=>{
    console.log("server is running at localhost:3000")
})