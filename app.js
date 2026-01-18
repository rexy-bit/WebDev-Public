import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";;
import itemRouter from "./routes/item.routes.js";
import cartRouter from "./routes/cart.routes.js";


const app = express();

app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/', (req, res)=>res.send("Welcome to ChronoWatch"));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/items', itemRouter)
app.use('/api/v1/cart', cartRouter);





app.listen(PORT, async() => {

    console.log(`App runing on : http://localhost:${PORT}`);

    await connectToDatabase();
});
