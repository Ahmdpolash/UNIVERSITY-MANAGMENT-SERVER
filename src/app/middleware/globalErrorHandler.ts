import { ErrorRequestHandler } from "express";

import { ZodError, ZodIssue } from "zod";
import { TErrors } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";

  let errorSource: TErrors = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path.length - 1],
        message: issue.message,
      };
    });
    statusCode = 400;

    return {
      statusCode,
      message: " validation error",
      errorSource,
    };
  };

  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err);

    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSource = simpliFiedError?.errorSource;
  }

  res.status(statusCode).json({
    success: false,
    message,

    errorSource,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });

  next();
};

export default globalErrorHandler;

/* 

pattens 

success
message
errorSources:[
  path:'',
  message:''
]
stack


*/
