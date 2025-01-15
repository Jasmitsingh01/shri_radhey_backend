import Express from "express";
import Proxy from 'express-http-proxy'
import Cors from 'cors'
const app = Express();

app.use(Express.json());
app.use(Cors());
// for Sockited.io to user

app.use(
  "/socket.io", Proxy('http://localhost:9000', {
    proxyReqPathResolver: (req) => req.originalUrl,
  parseReqBody: false,
  }
  )
);
// Json parser
app.use('/api/user', Proxy('http://127.0.0.1:9000', {

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
app.use('/api/userForm', Proxy('http://127.0.0.1:9000', {

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
app.use('/api/task', Proxy('http://127.0.0.1:9001'))
// Json parser
app.use('/api/client', Proxy('http://127.0.0.1:9002', {

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

app.use('/api/clientForm', Proxy('http://127.0.0.1:9002', {  
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

app.use('/api/field', Proxy('http://127.0.0.1:9003'))

app.use('/api/blog', Proxy('http://127.0.0.1:9004'))
// Form Data parser

app.use('/api/blogForm', Proxy('http://127.0.0.1:9004',{
  
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


app.use('/',(req,res)=>{
  res.send("Server Is Running")
})


export default app;
