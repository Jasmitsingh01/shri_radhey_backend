import express from "express";
import router from "./routes/index.routes";
import cookiePaser from 'cookie-parser'
import { createServer } from "http";
import { Server } from "socket.io";
import online from "./utlis/Setonline";
import ID_offline from "./utlis/ID_BASE_OFFLINE";

const exp = express();
const app = createServer(exp);
const io = new Server(app)



exp.use(express.json());
exp.use(cookiePaser());
exp.use('/', router)
const  onlineUser=new Map();

io.on('connection', (socket) => {
   console.log('User Connected with Socket id :-',socket.id)
   socket.on('user-online',async(data)=>{
      const {_id}=JSON.parse(data ?? "{}");
      if(_id!==''&& _id){
        
        onlineUser.set(_id,socket.id)
        await online(_id)
      }

   })
   socket.on('disconnect', async ()=>{
    console.log('User disconnected with Socket id :-',socket.id)
    for (let [userId, socketId] of onlineUser.entries()) {
        if (socketId === socket.id) {
           await ID_offline(userId)
          onlineUser.delete(userId);
          break;
        }
    }


   })

}
)

export default app;