import app from "./app";
import { config} from 'dotenv';
import connectDB from "./db";
config()
const Port= process.env.PORT ||  5001;

declare module 'express' {
    interface Request {
        user: any;
    }
}
(
    async () => {
        try {
            await connectDB();

            app.listen(Port,()=>{
                console.log(`Task Server is running on http://localhost:${Port}`)
            });
        } catch (error: any) {
            console.error(`Error: ${error?.message}`);
            process.exit(1);
        }
    }
)()