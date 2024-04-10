require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connectDB = require("./loaders/db.loader");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRouter = require("./routes/auth.route");
const workRouter = require("./routes/work.route");
// const postRouter = require("./routes/post.route");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
// const sniff = require("./middlewares/sniff")

// app.use(sniff)

app.use("/api/v0/auth", authRouter);
app.use("/api/v0/work", workRouter);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    const uri = "mongodb+srv://serverdev:"+process.env.DB_PASSWORD+"@cluster0.xlgthbp.mongodb.net/appdb?retryWrites=true&w=majority";
    await connectDB(uri);
    app.listen(port, () =>
      console.log(`server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
