import dotenv from "dotenv"
dotenv.config()

import express, { json, urlencoded } from "express"
import passport from "passport";
import mongoose from "mongoose";
import * as utils from "./lib/utils"
import indexRoutes from "./routes/index"
import authRoutes from "./routes/auth"
import initPassport from "./config/passport";
import cors from "cors"

mongoose.connect('mongodb+srv://halloweenuser:hg_pass123@angelahalee.0zova.mongodb.net/auth?retryWrites=true&w=majority', () => {
    console.log("Connected to MongoDB");
});

const app = express()

const PORT = process.env.PORT || 4000

initPassport(passport)

app.use(passport.initialize());
app.use(express.json());
app.use(urlencoded({extended: true}))
app.use(cors());

app.use("/", indexRoutes)

app.use("/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})