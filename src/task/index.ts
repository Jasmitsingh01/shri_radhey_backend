import app from "./app";
import { config} from 'dotenv';
import connectDB from "./db";
config()
const Port= process.env.PORT ||  5001;


(
    async () => {
        try {
            await connectDB();

            app.listen(Port);
        } catch (error: any) {
            console.error(`Error: ${error?.message}`);
            process.exit(1);
        }
    }
)()