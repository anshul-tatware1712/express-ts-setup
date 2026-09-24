import errorHandler from "#middleware/error.middleware.js";
import router from "#router/index.js";
import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
