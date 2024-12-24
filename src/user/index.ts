import { config} from 'dotenv';
config()


import connectDB from "./Database";
import app from "./app";


(
    async () => {
        try {
            await connectDB();

            const PORT = process.env.PORT || 5000;
            app.listen(PORT, () => {
                
            });
        } catch (error: any) {
            console.error(`Error: ${error?.message}`);
            process.exit(1);
        }
    }
)()