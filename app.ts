import  Express  from "express";
import Proxy from  'express-http-proxy'
const app = Express();

app.use(Express.json());

app.use('/api/user',Proxy('http://localhost:9000'))

app.use('/api/task',Proxy('http://localhost:9001'))

app.use('/api/client',Proxy('http://localhost:9002'))

app.use('/api/field',Proxy('http://localhost:9003'))

app.use('/api/blog',Proxy('http://localhost:9004'))




export default app;