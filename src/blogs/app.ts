import exprees from 'express'
import cookiePaser from 'cookie-parser'
import router from './routes/Index';

const app = exprees();
app.use(exprees.json({ limit: '10mb' })); // Increase limit to 10MB
app.use(exprees.urlencoded({ limit: '10mb', extended: true })); 
app.use(cookiePaser())

app.use('/', router)

export default app;