import connection from "./db/connection.js"
import UserRoute from "./routes/User.js"
import express from "express"
import cors from "cors"
import { PORT, DB_URI } from "./config.js"

const app = express();

connection(DB_URI);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors());
app.options('*', cors())
// user routes
app.use('/user', UserRoute);

app.listen(PORT, () => {
    console.log("Web App started at port " + PORT);
})
