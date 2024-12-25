import { config} from 'dotenv';
config()
import app from "./app";
import connectDB from "./db";
const Port= process.env.PORT || 5002;


(
    async () => {
        try {
            await connectDB();

            app.listen(Port, ()=>{
                console.log(`client Server is running on http://localhost:${Port}`)
            }   );
        } catch (error: any) {
            console.error(`Error: ${error?.message}`);
            process.exit(1);
        }
    }
)()