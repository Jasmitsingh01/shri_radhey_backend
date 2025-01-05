import express from "express";
import router from "./routes/index.routes";
import cookiePaser from 'cookie-parser'
import { createServer } from "http";
import { Server } from "socket.io";
import online from "./utlis/Setonline";
import offline from "./utlis/Setoffline";

const exp = express();
const app = createServer(exp);
const io = new Server(app)



exp.use(express.json());
exp.use(cookiePaser());
exp.use('/', router)
try {
    io.on('connection', (socket) => {
        console.log('user connected', socket.id);

        socket.on('join', async (data) => {
            const { token } = JSON.parse(data) || {};
            if (token) {
                await online(token)

            }

        });
        socket.on('leave', async (data) => {
            console.log('leave')
            const { token } = JSON.parse(data) || {};
            if (token) {
                await offline(token)
            }

        })
        socket.on('disconnect', () => {

            console.log('user disconnected', socket.id)
        })
    })
} catch (error) {
    console.error(error)
    io.close((err) => {
        console.log(err)
    })
}


export default app;