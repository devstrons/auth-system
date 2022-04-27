import mongoose from "mongoose"

export default function connection(DB_URI) {

  mongoose.connect(DB_URI).then(() => {
    console.log("MongoDB connected");
  }).catch((err) => {
    console.log("Error while connecting to database", err)
  });
}
