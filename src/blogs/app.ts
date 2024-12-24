import Exprees from 'express'
import cookiePaser from 'cookie-parser'

const app=Exprees();
app.use(Exprees.json());
app.use(cookiePaser())

export default app;