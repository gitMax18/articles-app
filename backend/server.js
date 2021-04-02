const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const userRoute = require("./routes/userRoutes.js");
const paperRoute = require("./routes/paperRoutes.js");
const appRoute = require("./routes/appRoutes.js");
const reviewRoute = require("./routes/reviewRoutes.js");
const likeRoute = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
dotenv.config();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

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
app.use("/api/v1/user", userRoute);
app.use("/api/v1/papers", paperRoute);
app.use("/api/v1/app", appRoute);
app.use("/api/v1/likes", likeRoute);
app.use("/api/v1/reviews", reviewRoute);

// Error middleware
app.use(errorMiddleware);

// Server listener
const server = app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT ${process.env.PORT}`);
});

// process.on("unhandledRejection", (err) => {
//   console.log(`uncaughtException : ${err.message}`);
//   server.close(() => process.exit(1));
// });
