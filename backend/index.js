import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import reportRouter from "./routes/reportRoutes.js";
import cors from "cors";
import { errorHandler, routeNotFound } from "./middlewares/errorHandler.js";

dotenv.config();
connectDb();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(helmet());
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/report", reportRouter);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(5500, () => {
  console.log("listning");
});
