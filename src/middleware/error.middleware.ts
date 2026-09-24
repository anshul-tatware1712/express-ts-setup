import type { NextFunction, Request, Response } from "express";
import logger from "#config/logger.js";
import { AppError } from "#utils/app.errors.js";
import { getCorrelationId } from "#utils/requestContext.js";

const isDev = process.env.NODE_ENV === "development";

const sendErrorDev = (err: Error | AppError, res: Response) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  logger.error(err.message, { error: err });

  res.status(statusCode).json({
    status: err instanceof AppError ? err.status : "error",
    message: err.message,
    stack: err.stack,
    error: err,
    correlationId: getCorrelationId(),
  });
};

const sendErrorProd = (err: Error | AppError, res: Response) => {
  if (err instanceof AppError && err.isOperational) {
    logger.warn(err.message, { error: err });
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      correlationId: getCorrelationId(),
    });
  } else {
    logger.error("Unexpected error", { error: err });
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
      correlationId: getCorrelationId(),
    });
  }
};

const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  if (isDev) {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

export default errorHandler;
