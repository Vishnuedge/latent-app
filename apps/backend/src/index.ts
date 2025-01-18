import express from "express";
import v1Router from './routes/v1'

const app = express();
app.use(express.json());

app.use("/api/v1", v1Router)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App is listening to the port:${PORT}`)
})