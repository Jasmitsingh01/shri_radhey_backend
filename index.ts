import { config } from "dotenv";
config()
import app from "./app";

const port = process.env.PORT|| 5000;

app.listen(port,()=>{
    console.log(`Main Server Runnig on ${port} with Url : http://localhost:${port}`)
});