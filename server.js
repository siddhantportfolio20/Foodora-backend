// start a server

import "dotenv/config";

import { app } from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Running on Port ${PORT}`);
});