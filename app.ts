import Express from "express";
import Proxy from 'express-http-proxy'
import Cors from 'cors'
const app = Express();

app.use(Express.json());
app.use(Cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// for Sockited.io to user

app.use(
  "/socket.io", Proxy('http://localhost:9000', {
    proxyReqPathResolver: (req) => req.originalUrl,
  parseReqBody: false,
  }
  )
);
// Json parser
app.use('/api/user', Proxy('http://localhost:9000', {

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
  parseReqBody:true,
}))
app.use('/api/userForm', Proxy('http://localhost:9000', {

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
  parseReqBody:false,
}))
app.use('/api/task', Proxy('http://localhost:9001'))
// Json parser
app.use('/api/client', Proxy('http://localhost:9002', {

  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers = proxyReqOpts.headers || {};

    if(srcReq?.headers['content-type']){
    
       
      proxyReqOpts.headers['Content-Type'] = srcReq.headers['content-type'];
    }
    else{
      proxyReqOpts.headers['Content-Type'] = 'application/json'
    }
    return proxyReqOpts;
  },
  userResDecorator: function(proxyRes, proxyResData, req, res) {
   
      return proxyResData;
  },
  parseReqBody:true,

   

}))
// Form Data parser

app.use('/api/clientForm', Proxy('http://localhost:9002', {  
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
  parseReqBody:false,
}))

app.use('/api/field', Proxy('http://localhost:9003'))

// app.use('/api/blog', Proxy('http://localhost:9004'))




export default app;