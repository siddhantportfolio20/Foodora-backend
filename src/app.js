// create a server

import e from "express";
import cookieParser from "cookie-parser"
import userAuth from "./routes/auth.routes.js"
import foodItem from "./routes/food.routes.js"
import cors from "cors"
import orderRoute from "./routes/order.routes.js";
export const app = e()

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(e.json());

app.use('/order/api', orderRoute)

app.use('/auth/api',userAuth)
app.use('/food-item/api',foodItem)
app.get("/",(req,res)=>{
    res.send("Hello from server")
})


