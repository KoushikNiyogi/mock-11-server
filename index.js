const express =  require("express");
const connection = require("./db");
const cors = require("cors");
const userRouter = require("./Router/UserRoutes")
 
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user",userRouter);



app.listen(process.env.PORT,async ()=>{
    try {
        await connection;
        console.log("connected to db");
    } catch (error) {
        console.log(err);
    }
})