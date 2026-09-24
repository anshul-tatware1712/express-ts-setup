import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export const validateSchema = (schema: z.ZodObject<any, any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Validating request body:", req.body);
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue: any) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res.status(400).json({ error: "Invalid data", details: errorMessages });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
