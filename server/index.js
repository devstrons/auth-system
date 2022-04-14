import connection from "./db/connection.js"
import UserRoute from "./routes/User.js"
import express from "express"
import cors from "cors"
import { PORT, DB_URI, __DEV__ } from "./config.js"

const app = express();

connection(DB_URI);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

console.log(__DEV__)
// __DEV__ ? "http://localhost:3000" : "https://myclientapp.com"
app.use(cors({
    origin: "*",
    credentials: true,
}));

// user routes
app.use('/user', UserRoute);

app.get('/', (req, res) => {
    res.send('Server running successfully');
})

app.listen(PORT, () => {
    console.log("Web App started at port " + PORT);
})
