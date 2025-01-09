import express from 'express'
import cookiePaser from 'cookie-parser'
import Boadyrouter from './routes/boadyType';
import complexionRouter from './routes/complexion';
import ethinicityRouter from './routes/ethinicity';
import locationRouter from './routes/locations';
import OccupationRouter from './routes/occupation';
import qualificationRouter from './routes/qualification';
declare module 'express' {
    interface Request {
        user: any;
    }
}
const app = express();

app.use(express.json());
app.use(cookiePaser())

app.use('/bodytype', Boadyrouter)

app.use('/complexion', complexionRouter)


app.use('/ethinicty', ethinicityRouter);


app.use('/location', locationRouter);

app.use('/occupation', OccupationRouter)

app.use('/qualification', qualificationRouter)




export default app;