import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";
import { requestContext } from "#utils/requestContext.js";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers["x-correlation-id"] as string) || randomUUID();
  res.setHeader("X-Correlation-Id", correlationId);

  requestContext.run({ correlationId }, () => {
    next();
  });
};

export default requestLogger;
