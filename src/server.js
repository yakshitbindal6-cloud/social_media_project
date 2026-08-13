import { app } from "./app.js";
import { PORT } from "./config/env.js";
import { connectToDatabase} from "./config/database.js";
async function startServer(){
    await connectToDatabase();
    app.listen(PORT,async ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}
startServer().catch((err)=>{
    console.log('Error starting the server:', err);
    process.exit(1);
})

// http://localhost:4000/api-docs