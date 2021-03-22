const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const userRoute = require("./routes/userRoutes.js");
const paperRoute = require("./routes/paperRoutes.js");
const appRoute = require("./routes/appRoutes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
app.use(cookieParser());

// Config Mongo_db
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Your application is now connected to MongoDB");
});

// Routes
app.use(userRoute);
app.use(paperRoute);
app.use(appRoute);

// Error middleware
app.use(errorMiddleware);

// Server listener
app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT ${process.env.PORT}`);
});
