import express from "express";
import morgan from "morgan";
import actorRoutes from "./routes/actorRoutes";
import cors from "cors";
import { loadFromCache } from "./middleware/queryCache";

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(loadFromCache);
app.use("/api/actors", actorRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode).send(error);
});
// Server Setup
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on: ", port));
