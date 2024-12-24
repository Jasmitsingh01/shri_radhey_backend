import Exprees from 'express'
import cookiePaser from 'cookie-parser'
import router from './routes/Index';

const app=Exprees();
app.use(Exprees.json());
app.use(cookiePaser())

app.use('/',router)

export default app;