import  express  from "express";
import Proxy from  'express-http-proxy'
import router from "./routes/index.routes";
import cookiePaser from 'cookie-parser'
const app = express();



app.use(express.json());
app.use(cookiePaser());
app.use('/',router)



export default app;