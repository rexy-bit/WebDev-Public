import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";


const app = express();

app.use(cors({
    origin : ["http://localhost:5173/"],
    credentials : true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/', (req, res)=>res.send("Welcome to ChronoWatch"));

app.listen(PORT, async() => {

    console.log(`App runing on : http://localhost:${PORT}`);

    await connectToDatabase();
});
