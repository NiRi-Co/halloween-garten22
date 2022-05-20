import dotenv from "dotenv"
dotenv.config()

import express from "express"

const app = express()

const PORT = process.env.PORT || 4000

app.get("/",(req, res) => {
    res.json({message: "API works!!!"})
})

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})