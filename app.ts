import Express from "express";
import Proxy from 'express-http-proxy'
import Cors from 'cors'
import bodyParser, { json } from "body-parser";
const app = Express();

app.use(Express.json());
app.use(Cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/api/user', Proxy('http://localhost:9000', {

  parseReqBody: true,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers = proxyReqOpts.headers || {};
    if(srcReq?.headers['content-type']){
      proxyReqOpts.headers['Content-Type'] = srcReq.headers['content-type'];
    }else{
      proxyReqOpts.headers['Content-Type'] = 'application/json'
    }
    return proxyReqOpts;
  },
  userResDecorator(proxyRes, proxyResData, userReq, userRes) {
    return proxyResData;
  },
}))

app.use('/api/task', Proxy('http://localhost:9001'))

app.use('/api/client', Proxy('http://localhost:9002', {

  parseReqBody: true,
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers = proxyReqOpts.headers || {};
    if(srcReq?.headers['content-type']){
      proxyReqOpts.headers['Content-Type'] = srcReq.headers['content-type'];
    }else{
      proxyReqOpts.headers['Content-Type'] = 'application/json'
    }
    return proxyReqOpts;
  },
  userResDecorator: function(proxyRes, proxyResData, req, res) {
   
      return proxyResData;
  }

   

}))

app.use('/api/field', Proxy('http://localhost:9003'))

app.use('/api/blog', Proxy('http://localhost:9004'))




export default app;