import logger from "#config/logger.js";
import { connectDB } from "#config/database.js";
import errorHandler from "#middleware/error.middleware.js";
import requestLogger from "#middleware/logger.middleware.js";

import router from "#router/index.js";
import express, { type Request, type Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(errorHandler);

async function startServer(): Promise<void> {
  await connectDB();

  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });
}
startServer();
