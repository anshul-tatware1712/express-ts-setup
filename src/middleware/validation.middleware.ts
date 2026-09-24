import { ValidationError } from "#utils/app.errors.js";
import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export const validateSchema = (schema: z.ZodObject<any, any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue: any) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      next(new ValidationError(errorMessages.map((err) => err.message).join(", ")));
    } else {
      next(error);
    }
  }
};
