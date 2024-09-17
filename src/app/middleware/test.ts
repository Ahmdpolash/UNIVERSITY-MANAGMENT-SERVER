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
    errorSource = err.issues.map((issue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    statusCode = 500;
    return {
      statusCode,
      errorSource,
      message: " validation error",
    };
  };

  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorSource = simpliFiedError.errorSource;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
  });
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
