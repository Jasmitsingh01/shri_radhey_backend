import  Express  from "express";
import Proxy from  'express-http-proxy'
const app = Express();

app.use(Express.json());

app.use('/api/user',Proxy('http://localhost:9000'))





export default app;